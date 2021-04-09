<template>
    <div id="signup-rest">
        <h1>Sign up now to start taking orders!</h1>
        <form id="restsignup" v-on:submit.prevent="registerRest()">
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
            <label>Tags/Labels for Restaurant: </label>
            <input type="text" v-model="restaurant.type" placeholder="e.g. Western, Burgers" title="Separate multiple labels with a comma" required /><br><br>
            <label>Upload Restaurant Logo (please paste image URL):</label><br>
            <input type="url" v-model.lazy="restaurant.image" required /><br>
            <span v-if="restaurant.image != ''">Image preview:<br>
            <img v-bind:src="restaurant.image" alt="Not found"></span><br>
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
                restaurant_name: "",
                first_name: "",
                last_name: "",
                password: "",
                email: "",
                contact_email: "",
                contact_num: "",
                address: "",
                postal_code: "",
                paynow: "",
                image: "",
                profile: 'restaurant',
                menu: [],
                reservation: [],
                pickup: [],
                order_counts: {},
                // for pickup collection
                type: "",
                away: "0km away",
                open_until: "Open until 22.00",
                //for delivery
                pricearray:[{
                    name:"Grab",
                    price:6,
                    web:"https://www.grab.com/sg/",
                },{
                    name:"Foodpanda",
                    price:5,
                    web:"https://www.foodpanda.sg/city/singapore",
                }],
            },
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
        registerRest: function() {
            if (this.toCreate === true) {
                firebase.auth().createUserWithEmailAndPassword(this.restaurant.email, this.restaurant.password)
                .then(user => {
                    alert(`Account created for ${user.user.email}`);
                    this.$root.signup_user_id = user.user.uid;
                    // database.collection('restaurants').doc(this.user_id).set(this.restaurant);
                    // this.$router.push('/signup-success').then(()=>location.reload());
                    // this.$router.go({path: this.$router.path});
                },
                err => {
                    alert(err.message);
                }).then(() => {
                    if (this.$root.signup_user_id != '') {
                        // add to 'restaurants' collection
                        database.collection('restaurants').doc(this.$root.signup_user_id).set(this.restaurant)
                        // this.$router.push('/signup-success')
                        .then(() => {
                            // add to 'pickup' collection
                            database.collection('pickup').doc(this.$root.signup_user_id).set({
                                address: this.restaurant.address,
                                away: this.restaurant.away,
                                image: this.restaurant.image,
                                menu: [],
                                orders: [],
                                postal_code: this.restaurant.postal_code,
                                restaurant_name: this.restaurant.restaurant_name,
                                type: this.restaurant.type,
                                open_until: this.restaurant.open_until
                            })
                        }).then(() => {
                            database.collection('reservations').doc(this.$root.signup_user_id).set({
                                // add to 'reservations' collection
                                restaurant_name: this.restaurant.restaurant_name,
                                address: this.restaurant.address,
                                postal: this.restaurant.postal_code,
                                slots: [],
                            })
                        }).then(() => {
                            database.collection('delivery').doc(this.$root.signup_user_id).set({
                                // add to 'delivery' collection
                                restaurant_name: this.restaurant.restaurant_name,
                                price: this.restaurant.pricearray,
                            })
                        }).then(()=>location.replace('/signup-success'));
                    }
                })
            } else {
                alert("Please check that you have filled in all details correctly. Your password must match.")
            }
        }        
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

#signup-rest, button {
    font-family: 'Poppins', sans-serif;
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