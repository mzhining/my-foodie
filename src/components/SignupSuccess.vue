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
            this.$router.push('/login');
        }
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

div, button {
    font-family: 'Poppins', sans-serif;
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