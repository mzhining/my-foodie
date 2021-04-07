<template>
    <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <h1> {{this.$route.params.id}} </h1>
                <img v-bind:src="this.datapacket.image" class = "icon"/>  
            </div>
            
            <div class="side-bar" align="left">
                <p> {{this.datapacket.type}} </p>
                <p> {{this.datapacket.open_until}} </p>
                <p> {{this.datapacket.away}} </p>
                <p> {{this.datapacket.address}} </p>
            </div>
    
        </div>
        <hr id="line">
        <div id="container">
            <div id="navigationbar">
                <ul>
                    <li><router-link to="/ordertoDelivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoReservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
            <div>
                <p> Reservation Confirmed! </p>
                <br>
                <br>
                <p> Your reservation is confirmed for {{this.$route.params.pax}} pax at {{this.$route.params.time}} on {{this.$route.params.date}} at {{this.$route.params.name}} at {{this.$route.params.postal}}. </p>
                <br>
                <br>
                <p id="shift"> Thank you for making a reservation for {{this.$route.params.name}} with MyFoodie! </p>
                <br>
                <br>
                <button class="special" @click="goToOrder"> Order in advance </button>
                <br>
                <br>
                <button class="special" @click="home"> Back to Homepage </button>
                <br>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data() {
        return {
            datapacket: []
        }
    },
    methods: {
        goToOrder: function() {
            this.$router.push({ name: 'reservationOrder', params: {id: this.$route.params.id, name: this.$route.params.name, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal, data: this.$route.params.data, slotNumber: this.$route.params.slotNumber, orderNumber: this.$route.params.orderNumber, itemsSelected: this.itemsSelected}});
        },
        home: function() {
            this.$router.push('/');
        },
        fetchItems: function() {
            database.collection('restaurants')
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if (doc.data().restaurant_name == this.$route.params.name) {
                        var datap = doc.data();
                        this.datapacket = datap;
                    }
                });
            });
        }
    },
    created() {
        this.fetchItems();
    }
}

</script>

<style>
img {
    height: 10rem;
}
.main-bar, .side-bar {
    position: relative;
    margin: 0;
    padding: 0;
    outline: 0;
    display: inline-block;
    border: none;
}
.main-bar {
    width: 30%;
}
.side-bar {
    width: 70%;
    bottom: 20px;
}
#line {
    border: 3px dashed #90141C;
}
#navigationbar {
    font-size:20px;
    margin-left:2%;
    float: left;
    width: 10%;
}

.special {
    background-color: pink; 
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    margin-left: 12%;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}

#shift{
    margin-left: 12%;
}
</style>