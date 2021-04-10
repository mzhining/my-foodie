<template>
    <div id="settings">
        <div v-if="!rendered"><center><p class="loader"></p></center></div>

        <div v-else-if="profile=='restaurant' && rendered">
            <settings-r></settings-r>
            <p><button class="save-ref" v-on:click="refresh()">Refresh with new changes</button>&nbsp;
            <button class="done" v-on:click="returnDash()">Return to dashboard</button></p>
        </div>
        
        <div v-else-if="profile=='customer' && rendered">
            <settings-c></settings-c>
            <p><button class="save-ref" v-on:click="refresh()">Refresh with new changes</button>&nbsp;
            <button class="done" v-on:click="returnDash()">Return to dashboard</button></p>
        </div>

        <div v-else-if="profile=='' && rendered">
            <h1>Error: Not logged in!</h1>
            <p><button v-on:click="redirectLogin()" class="done">Login</button></p>
        </div>


        <!-- <div>
            <p><button class="save" v-on:click="refresh()">Refresh with new changes</button>&nbsp;
            <button class="done" v-on:click="returnDash()">Return to dashboard</button></p>
        </div> -->

    </div>
</template>


<script>
import database from '../firebase.js';
import firebase from 'firebase';
import SettingsC from './SettingsC.vue';
import SettingsR from './SettingsR.vue';

export default {
    components: {
        'settings-c': SettingsC,
        'settings-r': SettingsR
    },
    data() {
        return {
            profile: '',
            rendered: false
        }
    },
    methods: {
        refresh: function() {
            location.reload();
        },
        returnDash: function() {
            // return to dashboard
            this.$router.push('/account');
        },
        redirectLogin: function() {
            this.$router.push('/register');
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
                        this.profile = this.$userProfile;
                        this.rendered = true;
                        // console.log('rest exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                    } else {
                        // console.log('not restaurant, search customer db');
                        database.collection('customers').doc(this.$userUid).get().then((doc) => {
                            console.log(doc.data());
                            if (doc.exists) {
                                this.$userData = doc.data();
                                this.$userId = this.$userData.email;
                                this.$userProfile = this.$userData.profile;
                                this.profile = this.$userProfile;
                                this.rendered = true;
                                // console.log('cust exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                            }
                        })
                    }

                    // insert functions here
                    // this.fetchInfo();
                    // this.fetchMenu();
                    // this.rendered = true;                    
                })
            } else {
                // console.log('not logged in');
                this.$userUid = '';
                this.$userData = '';
                this.$userId = '';
                this.$userProfile = '';
                this.rendered = true;
            }
        })
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

#settings, button {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    /* text-align: left; */
    /* padding-left: 300px; */
}

/* button {
    cursor: pointer;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 20px;
    border: none;
} */

.save-ref, .done {
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    /* padding: 10px 20px; */
    background-color: white; 
    color: black; 
    border: 3px solid #FFEBCD;
    /* background: #FFEBCD; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left:10px;
    width: 150px;
    font-size:15px;
    
}
.save-ref:hover {
    background-color: #FFEBCD;
}

.done:hover {
    background-color: #FFEBCD;
}

a:hover {
    color: rgb(121, 123, 255);
    cursor: pointer;
}

ul {
    list-style-type: none;
}

/* .save {
    background: rgb(255, 255, 217);
}

.done {
    background: rgb(254, 222, 255);
} */

.loader {
  border: 10px solid #f3f3f3;
  border-top: 10px solid #5bbbfc;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  align-content: center;
  align-self: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>