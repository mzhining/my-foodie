<template>
    <div id="login">
        <h1>Log in to my account</h1>
        <form id="userlogin">
            <label>Username: </label>
            <input type="text" v-model="login.username" /><br><br>
            <label>Password: </label>
            <input type="password" v-model="login.password" /><br><br>
            <p><button type="submit" v-on:click.prevent="redirectDashboard()">Login</button></p>
        </form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            login: {
                username: "",
                password: "",
            }
        }
    },
    methods: {
        redirectDashboard() {
            // "Redirect to Dashboard (customer/restaurant)";
            // this.$router.push({name: 'Dashboard', params: {username: this.login.username, password: this.login.password}})
        }
    }
}
</script>


<style scoped>
#login, button {
    font-family: Poppins;
    font-style: normal;
}
</style>