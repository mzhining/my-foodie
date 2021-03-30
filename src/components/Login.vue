<template>
    <div id="login">
        <h1>Log in to my account</h1>
        <form id="userlogin">
            <!-- <label>Username: </label>
            <input type="text" v-model="login.username" /><br><br> -->
            <label>Email: </label>
            <input type="email" v-model="email" /><br><br>
            <label>Password: </label>
            <input type="password" v-model="password" /><br><br>
            <!-- <p><button type="submit" v-on:click.prevent="redirectDashboard()">Login</button></p> -->
            <p><button type="submit" v-on:click.prevent="loginAcc()">Login</button></p>
        </form>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            // username: "",
            email: "",
            password: "",
        }
    },
    methods: {
        // redirectDashboard() {
        //     // "Redirect to Dashboard (customer/restaurant)";
        //     // this.$router.push({name: 'Dashboard', params: {username: this.login.username, password: this.login.password}})
        // },
        loginAcc: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`You are logged in as ${user.user.email}`);
                this.$router.push('/account');
                // this.$router.go({path: this.$router.path});

            },
            err => {
                alert(err.message);
            })
        }
    }
}
</script>


<style scoped>
#login, button {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
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