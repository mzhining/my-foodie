<template>
    <div id="settingsR">
        <div id="settingsRest">
            <h1>Account Settings</h1>
            <!-- update restaurant information -->
            <h2 v-on:click="updateInfo=!updateInfo" v-show="!updateInfo"><a>&#9654; Update Restaurant Information</a></h2>
            <h2 v-on:click="updateInfo=!updateInfo" v-show="updateInfo"><a>&#9660; Update Restaurant Information</a></h2>
            <div v-show="updateInfo">
                <form id="edit-data" v-on:submit.prevent="modifyData()">
                    <img v-bind:src="datapacket.image[1]" alt="Not found"><br>
                    Login Email: {{this.$userId}}<br>
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
                    <label>Address: </label>
                    <textarea v-model="datapacket.address[2]" cols="30" rows="2" v-bind:placeholder="datapacket.address[1]" /><br>
                    <label>Postal Code: </label>
                    <input type="tel" v-model="datapacket.postal_code[2]" pattern="[0-9]{6}" v-bind:placeholder="datapacket.postal_code[1]" /><br>
                    <label>Restaurant Logo (image URL): </label>
                    <input type="url" v-model.lazy="datapacket.image[2]" v-bind:placeholder="datapacket.image[1]" /><br>
                    <span v-if="datapacket.image[2] != ''">Image preview:<br><img v-bind:src="datapacket.image[2]" alt="Not found"></span><br>
                    <label>PayNow Number: +65 </label>
                    <input type="tel" v-model="datapacket.paynow[2]" pattern="[0-9]{8}" v-bind:placeholder="datapacket.paynow[1]" /><br>                
                    <p><button type="submit" class="save">Save changes</button></p>
                </form>
            </div>

            <!-- update restaurant menu -->
            <h2 v-on:click="updateMenu=!updateMenu" v-show="!updateMenu"><a>&#9654; Update Menu</a></h2>
            <h2 v-on:click="updateMenu=!updateMenu" v-show="updateMenu"><a>&#9660; Update Menu</a></h2>
            <div v-show="updateMenu">
                <!-- action buttons -->
                <p>Choose an action below:<br>
                <button class="display" v-on:click="updateAction='display'">Display</button>&nbsp;or
                <button class="add" v-on:click="updateAction='add'">Add/Modify</button>&nbsp;or
                <button class="remove" v-on:click="updateAction='remove'">Remove</button>
                </p>

                <!-- display menu from database -->
                <div v-show="updateAction=='display'" id="display-item">
                    <h3>My Menu</h3>
                    <p>You have {{numItems}} item(s) in your menu.</p>
                    <ul v-for="item in menu" v-bind:key="item.name">
                        <li>
                        &#9660; {{item.name}}: ${{item.price}}<br>
                        <img v-bind:src="item.image" alt="No image" style="height:50px;">
                        </li>
                    </ul>
                </div>

                <!-- add or modify items in database -->
                <form v-show="updateAction=='add'" id="add-item" v-on:submit.prevent="addItem()">
                    <h3>Add or Modify Item</h3>
                    <p>Note that if an item of the same name exists, the existing data will be overwritten (modified).</p>
                    <p><label>Name of Item: </label>
                    <input type="text" v-model="itemToAdd.name" required /></p>
                    <p><label>Price: $</label>
                    <input type="number" step='0.01' style="width:60px;" v-model="itemToAdd.price" required /></p>
                    <p><label>Image (paste URL): </label>
                    <input type="url" v-model.lazy="itemToAdd.image" required /><br>
                    <span v-if="itemToAdd.image != ''">Image preview:<br><img v-bind:src="itemToAdd.image" alt="Not found" /></span>
                    </p>

                    <p><button type="submit" class="add">Add/Modify item</button></p>
                </form>

                <!-- remove items from database -->
                <div v-show="updateAction=='remove'" id="remove-item">
                    <h3>Remove Item</h3>
                    <form v-on:submit.prevent="removeItem()">
                        Please enter the item name exactly as shown in the 'Display' page (case-sensitive).<br>
                        <p><label>Name of Item: </label>
                        <input type="text" v-model="itemToRemove" required />&nbsp;
                        </p>
                        <p><b>Warning: This action is irreversible!</b><br>
                        <button class="remove" type="submit">Remove item</button></p>
                    </form>
                </div>
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
            updateMenu: false,
            updateAction: "",
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
                },
            menu: {},
            itemToAdd: {
                name: '',
                price: '',
                image: ''
            },
            itemToRemove: '',
            profile: '',
            numItems: 0,
        }
    },
    methods: {
        fetchInfo: function() {
            database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
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

                for (let item in storedData.menu) {
                    item;
                    this.numItems++;
                }
                // console.log(this.datapacket);
                // console.log(this.datapacket['restaurant_name'])
            })
            // console.log('fetchInfo: ', this.userId, this.userProfile, this.userData);
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
            
            database.collection('restaurants').doc(this.$userUid).update(updateData).then(() => {
                alert("Information updated successfully!");
                location.reload();
            },
            err => {
                alert(err.message);
            });
        },
        fetchMenu: function() {
            database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
                let dbMenu = doc.data().menu;
                this.menu = dbMenu;
            })
            // console.log('fetchMenu: ', this.userId, this.userProfile, this.userData);

        },
        addItem: function() {
            let addData = {
                menu: {}
            }
            addData.menu[this.itemToAdd.name] = {
                name: this.itemToAdd.name,
                price: this.itemToAdd.price,
                image: this.itemToAdd.image
            }

            database.collection('restaurants').doc(this.$userUid).set(addData, {merge: true})
            .then(() => {
                alert("Item added successfully!");
                this.itemToAdd.name = '';
                this.itemToAdd.price = '';
                this.itemToAdd.image = '';
            }).then(()=>location.reload())
                // })
        },
        removeItem: function() {
            let menu = this.menu;
            let new_menu = {};

            if (this.itemToRemove in menu) {
                // item exists in menu
                // update menu with new_menu
                for (let item in menu) {
                    if (item != this.itemToRemove) {
                        new_menu[item] = menu[item];
                    }
                }
                database.collection('restaurants').doc(this.$userUid).update({menu: new_menu})
                .then(() => {
                    alert(this.itemToRemove + ' removed successfully!');
                    location.reload();
                },
                err => {alert(err.message)})
            } else {
                // does not exist
                // console.log("removeItem: ", this.$userUid);
                alert(this.itemToRemove + ' does not exist!');
            }
        },
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
                    }
                    // insert functions here
                    this.fetchInfo();
                    this.fetchMenu();
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
#settingsR, button {
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

.display {
    background: rgb(215, 232, 255);
}

.remove {
    background: rgb(255, 227, 227);
}

ul {
    list-style-type: none;
}

.save {
    background: rgb(255, 255, 217);
}
</style>