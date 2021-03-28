<template>
    <div id="settings">
        <h1>Account Settings</h1>
        
        <h2 v-on:click="updateInfo=!updateInfo" v-show="!updateInfo"><a>&#9654; Update Restaurant Information</a></h2>
        <h2 v-on:click="updateInfo=!updateInfo" v-show="updateInfo"><a>&#9660; Update Restaurant Information</a></h2>
        <!-- &#9654; &#9660; -->
        <div v-show="updateInfo">
            <ul></ul>
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
                restaurant_name: [],
                image: [],
                first_name: [],
                last_name: [],
                contact_num: [],
                contact_email: [],
                address: [],
                postal_code: [],
                paynow: [],
                }
        }
    },
    methods: {
        fetchInfo: function() {
            // retrieve user ID
            // let user_id = this.$route.params.user
            let user_id = 'v84vCqnf5NZg3ABkQx6O';
            database.collection('restaurants').doc(user_id).get().then((doc) => {
                let storedData = doc.data();
                for (let data in storedData) { // existing data (key)
                    for (let info in this.datapacket) { // current storage [old, new]
                        if (info === data) {
                            this.datapacket[info][0] = storedData[data];
                            // console.log(this.datapacket);
                            break;
                        }
                    }
                }
                console.log(this.datapacket);
                console.log(this.datapacket['restaurant_name'])
            })
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

h2 {
    cursor: pointer;
}

.done {
    background: rgb(255, 255, 217);
}
</style>