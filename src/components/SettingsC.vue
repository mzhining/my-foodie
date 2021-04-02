<template>
    <div id="settingsC">
        <div id="settingsCust">
            <h1>Account Settings</h1>

            <!-- update customer information -->
            <h2 v-on:click="updateInfo=!updateInfo" v-show="!updateInfo"><a>&#9654; Update Account Information</a></h2>
            <h2 v-on:click="updateInfo=!updateInfo" v-show="updateInfo"><a>&#9660; Update Account Information</a></h2>
            <div v-show="updateInfo">
                <form id="edit-data" v-on:submit.prevent="modifyData()">
                    <label>First Name: </label>
                    <input type="text" v-model="datapacket.first_name[2]" v-bind:placeholder="datapacket.first_name[1]" /><br>
                    <label>Last Name: </label>
                    <input type="text" v-model="datapacket.last_name[2]" v-bind:placeholder="datapacket.last_name[1]" /><br>
                    <label>Contact Number: +65 </label>
                    <input type="tel" v-model="datapacket.contact[2]" pattern="[0-9]{8}" v-bind:placeholder="datapacket.contact[1]" /><br>
                    <label>Address: </label>
                    <textarea v-model="datapacket.address[2]" cols="30" rows="2" v-bind:placeholder="datapacket.address[1]" /><br>
                    <label>Postal Code: </label>
                    <input type="tel" v-model="datapacket.postal_code[2]" pattern="[0-9]{6}" v-bind:placeholder="datapacket.postal_code[1]" /><br>
                    <p><button type="submit" class="save">Save changes</button></p>
                </form>
            </div>

            <!-- update restaurant menu -->
            <h2 v-on:click="updatePayment=!updatePayment" v-show="!updatePayment"><a>&#9654; Update Payment Details</a></h2>
            <h2 v-on:click="updatePayment=!updatePayment" v-show="updatePayment"><a>&#9660; Update Payment Details</a></h2>
            <div v-show="updatePayment">
                <form id="edit-payment" v-on:submit.prevent="modifyPayment()">
                    <label>Card Number: </label>
                    <input type="text" v-model="datapacket.card.number[2]" v-bind:placeholder="datapacket.card.number[1]" /><br>
                    <label>Name on card: </label>
                    <input type="text" v-model="datapacket.card.name[2]" v-bind:placeholder="datapacket.card.name[1]" /><br>
                    <label>CVV: </label>
                    <input type="tel" v-model="datapacket.card.cvv[2]" pattern="[0-9]{3}" v-bind:placeholder="datapacket.card.cvv[1]" /><br>
                    <label>Expiry Date: </label>
                    <input type="month" v-model="datapacket.card.expiry[2]" v-bind:placeholder="datapacket.card.expiry[1]" /><br>
                    <p><button type="submit" class="save">Save changes</button></p>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import database from '../firebase.js';
import firebase from 'firebase';

export default {
    data() {
        return {
            updateInfo: false,
            updatePayment: false,
            // [current, new]
            datapacket: {
                first_name: ['First Name', '', ''],
                last_name: ['Last Name', '', ''],
                contact: ['Contact Number', '', ''],
                address: ['Address', '', ''],
                postal_code: ['Postal Code', '', ''],
                card: {
                    name: ['Name on card', '', ''],
                    number: ['Card Number', '', ''],
                    cvv: ['CVV', '', ''],
                    expiry: ['Expiry Date', '', ''],
                }
            },
            profile: '',
        }
    },
    methods: {
        fetchInfo: function() {
            database.collection('customers').doc(this.$userUid).get().then((doc) => {
                let storedData = doc.data();
                for (let data in storedData) { // existing data (key)
                    for (let info in this.datapacket) { // current storage [old, new]
                        if (info === data) {
                            this.datapacket[info][1] = storedData[data];
                            // console.log(this.datapacket);
                            break;
                        }
                    }
                }
                for (let cardData in storedData.card) {
                    for (let cardInfo in this.datapacket.card) {
                        if (cardData == cardInfo) {
                            this.datapacket.card[cardInfo][1] = storedData.card[cardData];
                            break;
                        }
                    }
                }

                // this.datapacket.card.expiry[1] = Date.parse(this.datapacket.card.expiry[1]);
                console.log(this.datapacket.card.expiry[1]);
            })
        },
        modifyData: function() {
            // update data in firebase
            let updateFields = [];
            for (let data in this.datapacket) {
                // console.log(this.datapacket[data][2]);
                if (this.datapacket[data][2] != '') {
                    updateFields.push(data);
                }
            }
            let updateData = {};
            for (let field of updateFields) {
                updateData[field] = this.datapacket[field][2];
            }
            
            database.collection('customers').doc(this.$userUid).update(updateData).then(() => {
                alert("Information updated successfully!");
                location.reload();
            }).catch((err) => {alert(err.message)})
            // });
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$userUid = user.uid;
                database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
                    if (doc.exists) {
                        this.$userData = doc.data();
                        this.$userId = this.$userData.email;
                        this.$userProfile = this.$userData.profile;
                        // console.log('rest exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                    } else {
                        // console.log('not restaurant, search customer db');
                        database.collection('customers').doc(this.$userUid).get().then((doc) => {
                            console.log(doc.data());
                            if (doc.exists) {
                                this.$userData = doc.data();
                                this.$userId = this.$userData.email;
                                this.$userProfile = this.$userData.profile;
                                // console.log('cust exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                            }
                        })
                    }

                    // insert functions here
                    this.fetchInfo();
                    this.profile = this.$userProfile;
                    
                })
            } else {
                // console.log('not logged in');
                this.$userUid = '';
                this.$userData = '';
                this.$userId = '';
                this.$userProfile = '';
            }
        })
    }
}
</script>


<style scoped>
#settingsC, button {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    /* text-align: left; */
    /* padding-left: 300px; */
}

button {
    cursor: pointer;
    /* background: #FCDDEC; */
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 20px;
    border: none;
}

a:hover {
    color: rgb(121, 123, 255);
    cursor: pointer;
}

ul {
    list-style-type: none;
}

.save {
    background: rgb(221, 255, 221);
}
</style>