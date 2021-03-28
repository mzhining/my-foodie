<template>
    <div id="settings">
        <h1>Account Settings</h1>

        <!-- update restaurant information -->
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
                <p><button type="submit" class="save">Save changes</button></p>
            </form>
        </div>

        <!-- update restaurant menu -->
        <h2 v-on:click="updateMenu=!updateMenu" v-show="!updateMenu"><a>&#9654; Update Menu</a></h2>
        <h2 v-on:click="updateMenu=!updateMenu" v-show="updateMenu"><a>&#9660; Update Menu</a></h2>
        <div v-show="updateMenu">
            <!-- action buttons -->
            <p>Choose an item action below<br>
            <button class="add" v-on:click="updateAction='add'">Add</button>&nbsp;or
            <button class="modify" v-on:click="updateAction='modify'">Modify</button>&nbsp;or
            <button class="remove" v-on:click="updateAction='remove'">Remove</button>
            </p>

            <form v-show="updateAction=='add'" id="add-item" v-on:submit.prevent="addItem()">
                <p><label>Name of Item: </label>
                <input type="text" v-model="itemToAdd.name" required /></p>
                <p><label>Price: $</label>
                <input type="number" step='0.01' v-model="itemToAdd.price" required /></p>
                <p><button type="submit" class="save">Add item</button></p>
            </form>


            <ul v-for="item in menu" v-bind:key="item.key">
                <li>{{item.name}}: {{item.price}}</li>
            </ul>


        </div>

        <p><button class="done" v-on:click="returnDash()">Return to dashboard</button></p>
    </div>
</template>


<script>
import database from '../firebase.js';

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
                price: 0
            },
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
                // console.log(this.datapacket);
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
                alert("Information updated successfully!");
                location.reload();
            });
        },
        fetchMenu: function() {
            // retrieve user ID
            // let user_id = this.$route.params.user
            let user_id = 'Slurh0dQXG2ce18UHAfO';
            database.collection('restaurants').doc(user_id).get().then((doc) => {
                let dbMenu = doc.data().menu;
                this.menu = dbMenu;
            })

        },
        addItem: function() {
            // retrieve user ID
            // let user_id = this.$route.params.user
            let user_id = 'Slurh0dQXG2ce18UHAfO';
            // let addData = {}
            // let itemName = this.itemToAdd.name;
            let addData = {
                menu: {
                    itemName0: {
                        name: this.itemToAdd.name,
                        price: this.itemToAdd.price
                    }
                }
            }
            // database.collection('restaurants').doc(user_id).update({menu: this.itemToAdd}).then(() => {
                database.collection('restaurants').doc(user_id).set(addData, {merge: true})
                .then(() => {
                    alert("Item added successfully!");
                    this.itemToAdd.name = '';
                    this.itemToAdd.price = 0;
            // }).then(()=>location.reload())
        })
        },
        returnDash: function() {
            // return to dashboard
            this.$router.push('/account');
        }
    },
    created() {
        this.fetchInfo();
        this.fetchMenu();
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

.save {
    background: rgb(255, 255, 217);
}

.done {
    background: rgb(254, 222, 255);
}
</style>