<template>
    <div id="settingsR">
        <div id="settingsRest">
            <h1>Account Settings</h1>
            <!-- update restaurant information -->
            <h2 v-on:click="updateInfo=!updateInfo" v-show="!updateInfo"><a>&#9654; Restaurant Information</a></h2>
            <h2 v-on:click="updateInfo=!updateInfo" v-show="updateInfo"><a>&#9660; Restaurant Information</a></h2>
            <div class="update-data" v-show="updateInfo">
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
                    <textarea v-model="datapacket.address[2]" cols="40" rows="2" v-bind:placeholder="datapacket.address[1]" /><br>
                    <label>Postal Code: </label>
                    <input type="tel" v-model="datapacket.postal_code[2]" pattern="[0-9]{6}" v-bind:placeholder="datapacket.postal_code[1]" /><br>
                    <label>Tags/Labels for Restaurant: </label>
                    <input type="text" v-model="datapacket.type[2]" v-bind:placeholder="datapacket.type[1]" /><br>
                    <label>Restaurant Logo (image URL): </label>
                    <input type="url" v-model.lazy="datapacket.image[2]" v-bind:placeholder="datapacket.image[1]" /><br>
                    <span v-if="datapacket.image[2] != ''">Image preview:<br><img v-bind:src="datapacket.image[2]" alt="Not found"></span><br>
                    <label>PayNow Number: +65 </label>
                    <input type="tel" v-model="datapacket.paynow[2]" pattern="[0-9]{8}" v-bind:placeholder="datapacket.paynow[1]" /><br>                
                    <p><button type="submit" class="save">Save changes</button></p>
                </form>
            </div>

            <!-- update restaurant menu -->
            <h2 v-on:click="updateMenu=!updateMenu" v-show="!updateMenu"><a>&#9654; Menu Settings</a></h2>
            <h2 v-on:click="updateMenu=!updateMenu" v-show="updateMenu"><a>&#9660; Menu Settings</a></h2>
            <div class="update-data" v-show="updateMenu">
                <!-- action buttons -->
                <p>Choose an action below:<br>
                <button class="view" v-on:click="updateAction='view'">View</button>&nbsp;or
                <button class="add" v-on:click="updateAction='add'">Add/Modify</button>&nbsp;or
                <button class="remove" v-on:click="updateAction='remove'">Remove</button>
                </p>

                <!-- view/display menu from database -->
                <div v-show="updateAction=='view'" id="view-item">
                    <h3>My Menu</h3>
                    <p>You have {{numItems}} item(s) in your menu.</p>
                    <table>
                        <tr>
                            <th style="text-align:center;height:30px;">Image &#9660;</th>
                            <th style="text-align:left;">Item Name &#9660;</th>
                            <th style="text-align:center;">Price &#9660;</th>
                        </tr>
                        <tr v-for="item of menu" v-bind:key="item.name">
                            <td style="width:200px;" align="center"><img class="menuPic" v-bind:src="item.image" style="height:100px"></td>
                            <td style="width:300px;" align="left">{{item.name}}</td>
                            <td style="width:100px;" align="center">${{item.price}}</td>
                        </tr>
                    </table>
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
                        Please enter the item name exactly as shown in the 'View' tab (case-sensitive).<br>
                        <p><label>Name of Item: </label>
                        <input type="text" v-model="itemToRemove" required />&nbsp;
                        </p>
                        <p><b>Warning: This action is irreversible!</b><br>
                        <button class="remove" type="submit">Remove item</button></p>
                    </form>
                </div>
            </div>
            <!-- add reservation slots -->
            <h2 v-on:click="updateReserv=!updateReserv" v-show="!updateReserv"><a>&#9654; Reservation Settings</a></h2>
            <h2 v-on:click="updateReserv=!updateReserv" v-show="updateReserv"><a>&#9660; Reservation Settings</a></h2>
            <div class="update-data" v-show="updateReserv">
                <p>Choose an action below:<br>
                <button class="view" v-on:click="updateAction='viewReserv'">View</button> or 
                <button class="add" v-on:click="updateAction='addReserv'">Add</button></p>

                <div v-show="updateAction=='viewReserv'">
                    <h3>Current reservation slots for today</h3>
                    <p>Date: {{slotInfo.date}}<br>
                    Number of slots: {{numSlots}}</p>
                    <!-- <ul v-for="slot in slots" v-bind:key="slot.index">
                        <li>{{slot.time}}</li>
                    </ul> -->
                    Timeslots:<br>
                    <span v-for="slot in slots" v-bind:key="slot.index">{{slot.time}}<br></span>
                </div>

                <div v-show="updateAction=='addReserv'">
                    <h3>Add reservation slots for today</h3>
                    Date: {{slotInfo.date}}<br>
                    <form v-on:submit.prevent="addSlot()">
                        <label>Time: </label>
                        <input type="time" id="time" required/>
                        <p><button type="submit" class="add">Add slot</button></p>
                    </form>
                </div>
            </div>

            <!-- update PROMOTION-->
            <h2 v-on:click="updatePro=!updatePro" v-show="!updatePro"><a>&#9654; Promotion Settings</a></h2>
            <h2 v-on:click="updatePro=!updatePro" v-show="updatePro"><a>&#9660; Promotion Settings</a></h2>
            <div class="update-data" v-show="updatePro">
                <p>Choose an action below:<br>
                <button class="view" v-on:click="updateAction='viewPro'">View</button> or 
                <button class="add" v-on:click="updateAction='addPro'">Add</button></p>

                <div v-show="updateAction=='viewPro'" id = "forPromo">
                    <!-- <h3>All your promotion</h3>
                    <p>Date: {{slotInfo.date}}<br>
                    Number of slots: {{numSlots}}</p> -->
                    <!-- <ul v-for="slot in slots" v-bind:key="slot.index">
                        <li>{{slot.time}}</li>
                    </ul> -->
                    <h3>View All Your Promotions</h3>

                    <ul id="itemList">
                        <li v-for="promo in this.allPromo" v-bind:key="promo.index" id = "onePromo">
                            <!--first direct them to delivery page -->
                            <img v-bind:src="promo.picture" class = "icon"/>
                            <br> 
                            {{promo.caption}} <br>
                            Posted at: {{promo.time}}
                        </li>
                    </ul>
                </div>

                <div v-show="updateAction=='addPro'" id = "forPromo">
                    <h3>Add a New Promotion</h3>
                    <form id="add-item" v-on:submit.prevent="addPromo()">
                        <p><label>Caption: </label>
                        <input type="text" v-model="promoToAdd.caption" required /></p>
                        <p><label>Image (paste URL): </label>
                        <input type="url" v-model.lazy="promoToAdd.image" required /><br>
                        <span v-if="promoToAdd.image != ''">Image preview:<br><img v-bind:src="promoToAdd.image" alt="Not found" /></span>
                        </p>

                        <p><button type="submit" class="add">Add promotion</button></p>
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
            updateReserv: false,
            updatePro: false,
            updateAction: "",
            // [field name, current value, new value]
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
                type: ['Tags/Labels for Restaurant', '', '']
                },
            menu: [],
            itemToAdd: {
                name: '',
                price: '',
                image: ''
            },
            promoToAdd: {
                caption: '',
                time:'',
                image:''
            },
            itemToRemove: '',
            profile: '',
            numItems: 0,
            slots: [],
            slotInfo: {
                date: '',
                time: '',
                orders: [],
                pax: [],
                reservedBy: [],
                contact: []
            },
            numSlots: 0,
            allPromo : []
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
                    item; //placeholder usage
                    this.numItems++;
                }
                // console.log(this.datapacket);
                // console.log(this.datapacket['restaurant_name'])
            }, err=>{alert(err.message)});

            database.collection('reservations').doc(this.$userUid).get().then((doc) => {
                let storedResv = doc.data();
                this.slots = storedResv.slots

                for (let slot1 in storedResv.slots) {
                    slot1;
                    this.numSlots++;
                }
            }, err=>{alert(err.message)})
            // console.log('fetchInfo: ', this.userId, this.userProfile, this.userData);
        },
        fetchPromo: function() {
            database.collection('promotion').doc(this.$userUid).get().then((doc) => {
                let storedData = doc.data().posts;
                this.allPromo = storedData;});
                
                // }).then(() => console.log(this.allPromo));
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
            let updatePickupData = {};
            let updateReserveData = {};
            let updatePromotion = {};
            let updateRatings = {};
            let updateDelivery = {};

            for (let field of updateFields) {
                updateData[field] = this.datapacket[field][2];
                if (field == 'restaurant_name') {
                    updatePickupData[field] = this.datapacket[field][2];
                    updateReserveData[field] = this.datapacket[field][2];
                    updateDelivery[field] = this.datapacket[field][2];
                    updatePromotion[field] = this.datapacket[field][2];
                    updateRatings[field] = this.datapacket[field][2];
                } else if (field == 'postal_code') {
                    updatePickupData[field] = this.datapacket[field][2];
                    updateReserveData['postal'] = this.datapacket[field][2];
                    updatePromotion[field] = this.datapacket[field][2];
                } else if (field == 'address') {
                    updatePickupData[field] = this.datapacket[field][2];
                    updatePromotion[field] = this.datapacket[field][2];
                    updateReserveData[field] = this.datapacket[field][2];
                } else if (field == 'image') {
                    updatePickupData[field] = this.datapacket[field][2];
                    updatePromotion[field] = this.datapacket[field][2];
                } else if (field == 'type') {
                    updatePickupData[field] = this.datapacket[field][2];
                }
            }

            database.collection('restaurants').doc(this.$userUid).update(updateData).then(() => {
                database.collection('pickup').doc(this.$userUid).update(updatePickupData).then(() => {
                    database.collection('reservations').doc(this.$userUid).update(updateReserveData).then(() => {
                        database.collection('promotion').doc(this.$userUid).update(updatePromotion).then(() => {
                            database.collection('ratings').doc(this.$userUid).update(updateRatings).then(() => {
                                database.collection('delivery').doc(this.$userUid).update(updateDelivery).then(() => {
                                    alert("Information updated successfully!");
                                    location.reload();
                                }, err => {alert(err.message)})
                            }, err => {alert(err.message)})
                        }, err => {alert(err.message)})
                    }, err => {alert(err.message)})
                }, err => {alert(err.message)})
            }, err => {alert(err.message)})

        },
        fetchMenu: function() {
            database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
                let dbMenu = doc.data().menu;
                this.menu = dbMenu;
            })
            // console.log('fetchMenu: ', this.userId, this.userProfile, this.userData);

        },
        addItem: function() {
            let exists = false;
            let itemIndex;
            let itemNames = [];
            for (let item of this.menu) {
                itemNames.push(item.name);
                if (item.name == this.itemToAdd.name) {
                    exists = true;
                    itemIndex = itemNames.indexOf(item.name);
                }
            }
            let addData = {
                name: this.itemToAdd.name,
                price: this.itemToAdd.price,
                image: this.itemToAdd.image
            }

            if (exists) {
                // item exists in database, modify it
                this.menu[itemIndex] = addData;
            } else {
                // push item to array, update database
                this.menu.push(addData);
            }

            // console.log('exists: ', exists);
            // console.log('itemIndex: ', itemIndex);
            // console.log('itemNames: ', itemNames);
            // console.log('addData: ', addData);
            // console.log('menu: ', this.menu);

            database.collection('restaurants').doc(this.$userUid).update({menu: this.menu}, {merge: true}).then(() => {
                database.collection('pickup').doc(this.$userUid).update({menu: this.menu}, {merge: true}).then(() => {
                    alert("Item added/modified successfully!");
                    location.reload();
                }, err => {alert(err.message)})
            }, err => {alert(err.message)})

            // database.collection('restaurants').doc(this.$userUid).update({menu: this.menu}, {merge: true})
            // .then(() => {
            //     alert('Item added/modified successfully!');
            //     this.itemToAdd.name = '';
            //     this.itemToAdd.price = '';
            //     this.itemToAdd.image = '';
            //     location.reload();
            // }, err => {
            //     alert(err.message)
            // })
        },
        // addPromo: function() {
        //     this.promoInfo.time = document.getElementById("time").value
        //     this.allPromo.push(this.promoInfo);
        //     // console.log(this.slots);
        //     database.collection('promotion').doc(this.$userUid).update({posts: this.allPromo}, {merge:true}).then(() => {
        //         alert('Promotion added successfully!');
        //         location.reload();
        //     }, err=>{alert(err.message)})

        // },
        addPromo: function() {
            this.getNow();
            let newPromo = {
                caption: this.promoToAdd.caption,
                picture: this.promoToAdd.image,
                time: this.promoToAdd.time
            }
            console.log(newPromo);
            this.allPromo.push(newPromo);
            database.collection('promotion').doc(this.$userUid).update({posts: this.allPromo}, {merge: true}).then(() => {
                alert("Promotion added successfully!");
                location.reload();
            }, err => {alert(err.message)})
        },
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.promoToAdd.time = dateTime;
        },
        removeItem: function() {
            let exists = false;
            let itemIndex;
            let itemNames = [];
            for (let item of this.menu) {
                itemNames.push(item.name);
                if (item.name == this.itemToRemove) {
                    exists = true;
                    itemIndex = itemNames.indexOf(item.name);
                }
            }

            if (exists) {
                // item exists, delete it
                this.menu.splice(itemIndex, 1);
                database.collection('restaurants').doc(this.$userUid).update({menu: this.menu}, {merge: true}).then(() => {
                    database.collection('pickup').doc(this.$userUid).update({menu: this.menu}, {merge: true}).then(() => {
                        alert(this.itemToRemove + ' removed successfully!');
                        location.reload();
                    }, err => {alert(err.message)})
                }, err => {alert(err.message)})
                
                // database.collection('restaurants').doc(this.$userUid).update({menu: this.menu}, {merge: true})
                // .then(() => {
                //     alert(this.itemToRemove + ' removed successfully!');
                //     location.reload();
                // }, err => {
                //     alert(err.message);
                // })
            } else {
                // error
                alert(this.itemToRemove + ' does not exist!');

            }
            // console.log(this.menu);
            // console.log(this.menu.length);

            /*let menu = this.menu;
            let new_menu = {};

            if (this.itemToRemove in menu) {
                // item exists in menu
                // update menu with new_menu
                for (let item in menu) {
                    if (item != this.itemToRemove) {
                        new_menu[item] = menu[item];
                    }
                }
                // database.collection('restaurants').doc(this.$userUid).update({menu: new_menu})
                // .then(() => {
                //     alert(this.itemToRemove + ' removed successfully!');
                //     location.reload();
                // },
                // err => {alert(err.message)})
            } else {
                // does not exist
                // console.log("removeItem: ", this.$userUid);
                alert(this.itemToRemove + ' does not exist!');
            } */
        },
        addSlot: function() {
            this.slotInfo.time = document.getElementById("time").value
            this.slots.push(this.slotInfo);
            // console.log(this.slots);
            database.collection('reservations').doc(this.$userUid).update({slots: this.slots}, {merge:true}).then(() => {
                alert('Slot added successfully!');
                location.reload();
            }, err=>{alert(err.message)})

        },
        
        viewSlots: function() {
            //
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
                    }
                    // insert functions here
                    this.fetchInfo();
                    this.fetchMenu();
                    this.fetchPromo();
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
        this.slotInfo.date = new Date().toISOString().substr(0, 10);

    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

body {
   font-size: 13pt; 
}
.update-data {
    font-family: Inter, sans-serif;
    font-size: 13pt;
}

#settingsR{
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    font-family: Nunito;
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
    font-family: Inter;
}

a:hover {
    background-color: #EBA4A4;
    color:white;
    cursor: pointer;
}

.add {
    background: rgb(221, 255, 221);
}

.view {
    background: rgb(215, 232, 255);
}

.remove {
    background: rgb(255, 227, 227);
}

ul {
    list-style-type: none;
}

.save {
    background:#EBA4A4;
    border:none;
}

.save:hover {
    background:#90141C;
    color:white;
    cursor: pointer;
}

table {
    align-items: center;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
}

tr:nth-child(odd) {
    background-color:seashell;
}

th {
    background-color:papayawhip;
}

#onePromo {
    font-size:12px;
    margin-left:10px;
    margin-right:10px;
    margin-top:10px;
    margin-bottom:10px;
    /* text-align: center; */
}

#icon {
    height: 17rem;
}

#forPromo {
    text-align: center;
}

#itemList {
    margin: auto;
    padding: 10px;
    align-content: center;
    width: 70%;
}

</style>