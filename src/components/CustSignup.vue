<template>
    <div id="cust-signup">
        <h1>Sign up to start ordering!</h1>
        <form id="custsignup">
            <h2>Account Information</h2>
            <label>First Name: </label>
            <input type="text" v-model="customer.first_name" required /><br><br>
            <label>Last Name: </label>
            <input type="text" v-model="customer.last_name" required /><br><br>
            <label title="Create a unique username to log in">Username: </label>
            <input type="text" v-model="customer.username" title="Create a unique username to log in" required /><br><br>
            <label>Password: </label>
            <input type="password" v-model="customer.password" required /><br><br>
            <label>Confirm Password: </label>
            <input type="password" v-model="cfmPwd" v-on:keyup="checkPassword()" required /><br>
            {{pwdText}}<br>
            <label>Email Address: </label>
            <input type="email" v-model="customer.email" required /><br><br>
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
            <p><button type="submit" v-on:click.prevent="createCust()">Create my account!</button></p>
        </form>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            cfmPwd: "",
            pwdText: "",
            customer: {
                username: "",
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
                // cardNum: "",
                // cardCvv: "",
                // cardExp: "",
                // cardName: "",
                cart: {},
                favourites: [],
            }
        }
    },
    methods: {
        checkPassword() {
            if (this.customer.password!="") {
                if (this.cfmPwd === this.customer.password) {
                    this.pwdText = ""
                } else {
                    this.pwdText = "Your password does not match"
                }
            } else {
                this.pwdText = ""
            }
        },
        createCust() {
            // add customer details to firebase
            let toCreate = true;

            // check if account exists
            database.collection('customers').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.id === this.customer.username) {
                        alert("Username exists, please try another username.");
                        toCreate = false;
                    }
                })
            }).then(() => {
                if (toCreate === true) {
                    database.collection('customers').doc(this.customer.username).set(this.customer);
                    alert("Account created successfully!")
                    // location.reload();
                    // push to login page
                }
            })
        }
    }
}
</script>


<style scoped>
#cust-signup {
    font-family: Poppins;
    font-style: normal;
    /* text-align: left; */
    /* padding-left: 300px; */
}
</style>