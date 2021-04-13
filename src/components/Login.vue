<template>
    <div id="login">
        <h1>Log in to your account</h1>
        <form id="userlogin">
            <!-- <label>Username: </label>
            <input type="text" v-model="login.username" /><br><br> -->
            <label>Email: </label>
            <input type="email" v-model="email" /><br><br>
            <label>Password: </label>
            <input type="password" v-model="password" /><br><br>
            <p><button type="submit" v-on:click.prevent="loginAcc()">Login</button></p>
        </form>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        loginAcc: function() {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                return firebase.auth().signInWithEmailAndPassword(this.email, this.password)})
                .then(user => {
                alert(`Welcome! You are logged in as ${user.user.email}`);
                // console.log("Login: ", firebase.auth().currentUser.email);
                // this.$router.push('/account');
                // this.$router.push({name:'account'});
                this.$router.push({name:'home'});
            },
            err => {
                alert(err.message);
            
            })
        }
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

#login, button {
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    font-family: Nunito;
    font-weight: bold;
}

button {
    font-family: Inter, sans-serif;
    font-weight: normal;
    cursor: pointer;
    background: #FFEBCD;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 10px;
    border: none;
}

button:hover {
    background-color: #EBA4A4;
    color: white;
}

#userlogin {
    font-family: Inter, sans-serif;
    font-weight: normal;
}
</style>