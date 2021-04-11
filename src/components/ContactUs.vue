<template>
    <div id="contact-us">
        <h1>Facing any issues? Contact us below</h1>      
        
        <form id = "content">
            <label>Name: </label> 
            <input type="text" v-model="contactus.name" required/><br><br>

            <label>Email: </label>
            <input type="text" v-model="contactus.email" required /><br><br>

            <label>Contact Number: </label>
            <input type="text" v-model="contactus.contact_number" required /><br><br>

            <label>Message: </label>
            <textarea type="text" v-model="contactus.message" cols = "30" rows = "5" required />     
        

        <p id = "submit-button"><button type="submit" v-on:click="submitContact">Submit</button></p>
        </form>

    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            contactus: {
                name: "",
                email: "",
                contact_number: "",
                message: ""
            }
        }
    },
    methods: {
        submitContact() {
             if(this.contactus.name && this.contactus.email && this.contactus.message && this.contactus.contact_number) {
                database.collection('contactus').add(this.contactus);
                alert("Your message has been sent!");
             } else {
                 alert("You have not filled up the form properly!");
             }
        },       
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

#contact-us{
    font-family: Nunito;
    font-style: bold;
    text-align: left; 
    /* padding-left: 300px; */
}

#submit-button{
    text-align: center;
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

#content {
    width: calc(100% - 8rem);
    max-width: 1000px;
    margin: auto;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}

h1 {
    text-align: center;
}
</style>