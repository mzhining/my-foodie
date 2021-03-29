<template>
    <div id="register">
        <h1>My Account</h1>
        <p>Log in to your account or sign up now by selecting an option below</p>
        <p><button class="newacc" v-on:click="redirectPage('rest')">I am a seller</button><button class="newacc" v-on:click="redirectPage('cust')">I am a customer</button></p>
        <p><button class="existacc" v-on:click="redirectPage()">I have an account</button></p>
    </div>
</template>


<script>
export default {
    data() {
        return {}
    },
    methods: {
        redirectPage(targ) {
            if (targ === 'rest') {
                this.$router.push({path: '/signup-rest'});
            } else if (targ === 'cust') {
                this.$router.push({path: '/signup-cust'});
            } else {
                this.$router.push({path: '/login'});
            }
        }
    }
}
</script>


<style scoped>
#register {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
}

button {
    cursor:pointer;
}

.newacc {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    padding: 10px 20px;
    background: #FDFFD0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: none;
}

.existacc {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    padding: 10px 20px;
    background: #E3FFE6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: none;
}
</style>