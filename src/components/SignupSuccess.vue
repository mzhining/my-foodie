<template>
    <div id="signup-success">
        <h1>Your account is successfully created!</h1>
        <p>Log in to your new account by clicking the 'Login' button below.</p>
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
    background: #bbffca;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 20px;
    border: none;
}
</style>