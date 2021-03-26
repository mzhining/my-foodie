<template>
    <div id="signup-rest">
        <h1>Sign up now to start taking orders!</h1>
        <form id="restsignup" v-on:submit.prevent="createRest();registerRest()">
            <h2>Account Information</h2>
            <label>First Name: </label>
            <input type="text" v-model="restaurant.first_name" required /><br><br>
            <label>Last Name: </label>
            <input type="text" v-model="restaurant.last_name" required /><br><br>
            <label>Restaurant Name: </label>
            <input type="text" v-model="restaurant.restaurant_name" required /><br><br>
            <!-- <label title="Create a unique username to log in">Username: </label> -->
            <!-- <input type="text" v-model="restaurant.username" title="Create a unique username to log in" required /><br><br> -->
            <label>Email Address (required for login): </label>
            <input type="email" v-model="restaurant.email" required /><br><br>
            <label>Password: </label>
            <input type="password" v-model="restaurant.password" required /><br><br>
            <label>Confirm Password: </label>
            <input type="password" v-model="cfmPwd" v-on:keyup="checkPassword()" required /><br>
            {{pwdText}}<br>
            <label>Email Address (customer service): </label>
            <input type="email" v-model="restaurant.contact_email" required /><br><br>
            <label>Contact Number: </label>
            +65 <input type="tel" v-model="restaurant.contact_num" pattern="[0-9]{8}" required /><br><br>
            <label>Address: </label><br>
            <textarea v-model="restaurant.address" cols="30" rows="2" required /><br><br>
            <label>Postal Code: </label>
            <input type="tel" v-model="restaurant.postal_code" pattern="[0-9]{6}" required /><br><br>
            <h2>Payment Details</h2>
            Payment for your orders will be sent to your PayNow phone number.<br><br>
            <label>PayNow Number: </label>
            +65 <input type="tel" v-model="restaurant.paynow" pattern="[0-9]{8}" required /><br><br>            
            <!-- <p><button type="submit" v-on:click.prevent="createRest()">Create my account</button></p> -->
            <p><button type="submit">Create my account</button></p>
        </form>
    </div>
</template>


<script>
import database from '../firebase.js'
import firebase from 'firebase';

export default {
    data() {
        return {
            toCreate: true,
            cfmPwd: "",
            pwdText: "",
            restaurant: {
                // username: "",
                restaurant_name: "",
                first_name: "",
                last_name: "",
                password: "",
                email: "",
                contact_email: "",
                contact_num: "",
                address: "",
                postal_code: "",
                paynow: ""
            }
        }
    },
    methods: {
        checkPassword() {
            if (this.restaurant.password!="") {
                if (this.cfmPwd === this.restaurant.password) {
                    this.pwdText = ""
                    this.toCreate = true;
                } else {
                    this.pwdText = "Your password does not match";
                    this.toCreate = false;
                }
            } else {
                this.pwdText = ""
            }
        },
        createRest() {
            // add restaurant details to firebase
            if (this.toCreate === true) {
                database.collection('restaurants').add(this.restaurant);
            }

            // // check if account exists
            // database.collection('restaurants').get().then(snapshot => {
            //     snapshot.docs.forEach(doc => {
            //         if (doc.id === this.restaurant.username) {
            //             alert("Username exists, please try another username.");
            //             this.toCreate = false;
            //         }
            //     })
            // }).then(() => {
            //     if (this.toCreate === true) {
            //         database.collection('restaurants').doc(this.restaurant.username).set(this.restaurant);
            //         alert("Account created successfully!")
            //     }
            // }).then(() => {
            //     if (this.toCreate === true) {
            //         this.$router.push({path: 'signup-success'})
            //     }
            // })
        },
        registerRest: function() {
            if (this.toCreate === true) {
                firebase.auth().createUserWithEmailAndPassword(this.restaurant.email, this.restaurant.password)
                .then(user => {
                    alert(`Account created for ${user.user.email}`);
                    this.$router.push('/signup-success').then(()=>location.reload());
                    // this.$router.go({path: this.$router.path});
                },
                err => {
                    alert(err.message);
                });
            } else {
                alert("Please check that you have filled in all details correctly. Your password must match.")
            }
        }        
    }
}
</script>


<style scoped>
#signup-rest, button {
    font-family: Poppins;
    font-style: normal;
    /* text-align: left; */
    /* padding-left: 300px; */
}

button {
    cursor: pointer;
    background: #FCDDEC;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 20px;
    border: none;
}
</style>