<template>
    <div id="settings">
        <h1>Account Settings</h1>
        
        <h2 v-on:click="updateInfo=!updateInfo" v-show="!updateInfo"><a>&#9654; Update Restaurant Information</a></h2>
        <h2 v-on:click="updateInfo=!updateInfo" v-show="updateInfo"><a>&#9660; Update Restaurant Information</a></h2>
        <div v-show="updateInfo">
            <form id="edit-data" v-on:submit.prevent="modifyData()">
                <img v-bind:src="datapacket.image[1]" alt="Not found"><br>
                <label>First Name: </label>
                <input type="text" v-model="datapacket.first_name[2]" v-bind:placeholder="datapacket.first_name[1]" /><br>
                <label>Last Name: </label>
                <input type="text" v-model="datapacket.last_name[2]" v-bind:placeholder="datapacket.last_name[1]" /><br>
                <label>Restaurant Name: </label>
                <input type="text" v-model="datapacket.restaurant_name[2]" v-bind:placeholder="datapacket.restaurant_name[1]" /><br>
                <label>Email Address (customer service): </label>
                <input type="email" v-model="datapacket.contact_email[2]" v-bind:placeholder="datapacket.contact_email[1]" /><br>
                <label>Contact Number: +65 </label>
                <input type="tel" v-model="datapacket.contact_num[2]" pattern="[0-9]{8}" v-bind:placeholder="datapacket.contact_num[1]" /><br>
                <label>Postal Code: </label>
                <input type="tel" v-model="datapacket.postal_code[2]" pattern="[0-9]{6}" v-bind:placeholder="datapacket.postal_code[1]" /><br>
                <label>Restaurant Logo (image URL): </label>
                <input type="url" v-model.lazy="datapacket.image[2]" v-bind:placeholder="datapacket.image[1]" /><br>
                <span v-if="datapacket.image[2] != ''">Image preview:<br><img v-bind:src="datapacket.image[2]" alt="Not found"></span><br>
                <label>PayNow Number: +65 </label>
                <input type="tel" v-model="datapacket.paynow[2]" pattern="[0-9]{8}" v-bind:placeholder="datapacket.paynow[1]" /><br>                
                <p><button type="submit">Save changes</button></p>
            </form>
        </div>

        <h2 v-on:click="updateMenu=!updateMenu" v-show="!updateMenu"><a>&#9654; Update Menu</a></h2>
        <h2 v-on:click="updateMenu=!updateMenu" v-show="updateMenu"><a>&#9660; Update Menu</a></h2>
        <p v-show="updateMenu">
        &#9660; Add Item<br>
        Choose an item:<br>
        <button class="add">Add</button>&nbsp;
        <button class="modify">Modify</button>&nbsp;
        <button class="remove">Remove</button>
        </p>

        <p><button class="done">Done</button></p>
    </div>
</template>


<script>
import database from '../firebase.js';

export default {
    data() {
        return {
            updateInfo: false,
            updateMenu: false,
            // [current, new]
            datapacket: {
                restaurant_name: ['Restaurant Name', '', ''],
                image: ['Restaurant Logo', '', ''],
                first_name: ['First Name', '', ''],
                last_name: ['Last Name', '', ''],
                contact_num: ['Contact Number', '', ''],
                contact_email: ['Email Address (customer service)', '', ''],
                address: ['Address', '', ''],
                postal_code: ['Postal Code', '', ''],
                paynow: ['PayNow', '', ''],
                }
        }
    },
    methods: {
        fetchInfo: function() {
            // retrieve user ID
            // let user_id = this.$route.params.user
            let user_id = 'Slurh0dQXG2ce18UHAfO';
            database.collection('restaurants').doc(user_id).get().then((doc) => {
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
                console.log(this.datapacket);
                // console.log(this.datapacket['restaurant_name'])
            })
        },
        modifyData: function() {
            // update data in firebase
            let user_id = 'Slurh0dQXG2ce18UHAfO';
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
            
            database.collection('restaurants').doc(user_id).update(updateData).then(() => {
                alert("Information successfully updated!");
                location.reload();
            });
        }
    },
    created() {
        this.fetchInfo();
    }
}
</script>


<style scoped>
#settings, button {
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

.add {
    background: rgb(221, 255, 221);
}

.modify {
    background: rgb(215, 232, 255);
}

.remove {
    background: rgb(255, 227, 227);
}

ul {
    list-style-type: none;
}

.done {
    background: rgb(255, 255, 217);
}
</style>