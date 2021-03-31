<template>
    <div id="signup-cust">
        <h1>Sign up now to start ordering!</h1>
        <!-- <form id="custsignup" v-on:submit.prevent="createCust()"> -->
        <form id="custsignup" v-on:submit.prevent="createCust();registerCust()">
            <h2>Account Information</h2>
            <label>First Name: </label>
            <input type="text" v-model="customer.first_name" required /><br><br>
            <label>Last Name: </label>
            <input type="text" v-model="customer.last_name" required /><br><br>
            <label>Email (required for login): </label>
            <input type="email" v-model="customer.email" required /><br><br>
            <label>Password: </label>
            <input type="password" v-model="customer.password" required /><br><br>
            <label>Confirm Password: </label>
            <input type="password" v-model="cfmPwd" v-on:keyup="checkPassword()" required /><br>
            {{pwdText}}<br>
            <label>Contact Number: </label>
            +65 <input type="tel" v-model="customer.contact" pattern="[0-9]{8}" required /><br><br>
            <label>Address: </label><br>
            <textarea v-model="customer.address" cols="30" rows="2" required /><br><br>
            <label>Postal Code: </label>
            <input type="tel" v-model="customer.postal_code" pattern="[0-9]{6}" required /><br><br>
            <h2>Payment Details</h2>
            Currently, we only accept payment by credit/debit card.<br><br>
            <label>Card Number: </label>
            <!-- <input type="text" v-model="customer.cardNum" required /><br><br> -->
            <input type="text" v-model="customer.card.number" required /><br><br>
            <label>Name on card: </label>
            <input type="text" v-model="customer.card.name" required /><br><br>
            <label>CVV: </label>
            <input type="tel" v-model="customer.card.cvv" pattern="[0-9]{3}" required /><br><br>
            <label>Expiry Date: </label>
            <input type="month" v-model="customer.card.expiry" placeholder="MM/YY" required /><br><br>
            <!-- <p><input type="submit" value="Create my account!" v-on:click.prevent="createCust()" /></p> -->
            <!-- <p><button type="submit" v-on:click.prevent="createCust()">Create my account</button></p> -->
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
            customer: {
                // username: "",
                first_name: "",
                last_name: "",
                password: "",
                email: "",
                contact: "",
                address: "",
                postal_code: "",
                card: {
                    cvv: "",
                    expiry: "",
                    name: "",
                    number: ""
                },
                cart: {},
                favourites: [],
                profile: 'customer',
                reservation: {}
            }
        }
    },
    methods: {
        checkPassword() {
            if (this.customer.password!="") {
                if (this.cfmPwd === this.customer.password) {
                    this.pwdText = ""
                    this.toCreate = true;
                } else {
                    this.pwdText = "Your password does not match"
                    this.toCreate = false;
                }
            } else {
                this.pwdText = ""
            }
        },
        createCust() {
            // add customer details to firebase
            if (this.toCreate === true) {
                database.collection('customers').add(this.customer);
            }

            // // check if account exists
            // database.collection('customers').get().then(snapshot => {
            //     snapshot.docs.forEach(doc => {
            //         if (doc.id === this.customer.username) {
            //             alert("Username exists, please try another username.");
            //             this.toCreate = false;
            //         }
            //     })
            // }).then(() => {
            //     if (this.toCreate === true) {
            //         database.collection('customers').doc(this.customer.username).set(this.customer);
            //         alert("Account created successfully!")
            //     }
            // }).then(() => {
            //     if (this.toCreate === true) {
            //         this.$router.push('/signup-success');
            //     }
            // })
        },
        registerCust: function() {
            if (this.toCreate === true) {
                firebase.auth().createUserWithEmailAndPassword(this.customer.email, this.customer.password)
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
                        database.collection('customers').doc(this.$root.signup_user_id).set(this.customer)
                        // this.$router.push('/signup-success')
                        .then(()=>location.replace('/signup-success'));
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
#signup-cust, button {
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