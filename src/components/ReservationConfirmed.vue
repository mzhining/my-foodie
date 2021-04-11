<template>
    <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <h1> {{this.name}} </h1>
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
                <ul class="naviBar">
                    <li><router-link to="/ordertoDelivery" exact><p>Delivery</p></router-link></li>
                    <li id = "current"><router-link to="/ordertoReservation" exact><p>Reservation</p></router-link></li>
                    <li><router-link to="/ordertoPickup" exact><p>Pick up</p></router-link></li>
                </ul>
            </div>
            <div>
                <h1> Reservation Confirmed! </h1>
                <br>
                <p> Your reservation is confirmed for {{this.$route.params.pax}} pax at {{this.$route.params.time}} on {{this.$route.params.date}} at {{this.$route.params.name}} at {{this.$route.params.postal}}. </p>
                <br>
                <p id="shift"> Thank you for making a reservation for {{this.$route.params.name}} with MyFoodie! </p>
                <br>
                <button class="special" @click="goToOrder"> Order in advance </button>
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
    props: {
        name:{
            type: String
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
    font-size: 15px;
    display:inline-block;
    padding:8px;
    margin: 10px 10px 10px 10px;
}

.special:hover {
    background-color:#90141C;
    font-size:15px;
    color:white;
}

#shift{
    margin-left: 12%;
}
</style>