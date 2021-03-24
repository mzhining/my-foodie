<template>
    <div id="signup-success">
        <h1>Your account is successfully registered!</h1>
        <p>Welcome! Log in to your new account by clicking the 'Login' button below.</p>
        <p><button v-on:click.prevent="redirectLogin()">Login</button></p>
    </div>
</template>


<script>
export default {
    methods: {
        redirectLogin() {
            this.$router.push({path: '/login'});
        }
    }
}
</script>


<style scoped>
div, button {
    font-family: Poppins;
    font-style: normal;
    /* text-align: left; */
    /* padding-left: 300px; */
}

button {
    cursor: pointer;
}
</style>