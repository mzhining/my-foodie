<template>
    <div>
    <div id="register">
        <h1>My Account</h1>
    </div>
    <div>
        <p>Log in to your account or sign up now by selecting an option below</p>
        <p>
            <button class="newacc" v-on:click="redirectPage('rest')"><p>I am a seller</p></button>
            <button class="newacc" v-on:click="redirectPage('cust')"><p>I am a customer</p></button>
        </p>
        <p>
            <button class="existacc" v-on:click="redirectPage()"><p>I have an account</p></button>
        </p>
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

body {
    font-family: Inter, sans-serif;
    font-size:15px;
}

#register {
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    font-family: Nunito;
    font-weight: bold;
}

p {
    font-family: Inter;
}

button {
    cursor:pointer;
    padding:10px;
    /* font-weight: bold; */
}

.newacc {
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    /* padding: 10px 20px; */
    background-color: white; 
    color: black; 
    border: 3px solid #FFEBCD;
    /* background: #FFEBCD; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-left:10px;
    width: 150px;
    font-size:15px;
    font-family: Inter;
}

.newacc:hover {
    background-color: #FFEBCD;
    color: black;
}

.existacc {
    /* font-family: 'Poppins', sans-serif;
    font-style: normal; */
    background-color: white; 
    color: black; 
    border: 3px solid #EBA4A4;
    padding: 10px 20px;
    /* background: #9BBFA4; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    /* border: none; */
    font-size:15px;
    font-family: Inter;
}

.existacc:hover {
    background-color: #EBA4A4;
    color: black;
}

</style>