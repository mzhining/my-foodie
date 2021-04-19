<template>
 <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <h1> {{this.name}} </h1>
                <img v-bind:src="this.datapacket.image" class = "icon"/>  
            </div>
            
            <div class="side-bar" align="left">
                <p> ⭐️ {{this.rating}} </p>
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
            <aside id="picture">
                <div class="content" align = "left">
                    <p> Your reservation and order for {{this.$route.params.name}} at {{this.$route.params.postal}} is complete. </p>
                    <br>
                    <p> Your food will be ready at {{this.$route.params.time}} on {{this.$route.params.date}}. </p>
                    <br>
                    <p> Thank you for making a reservation for {{this.$route.params.name}} with MyFoodie! </p>
                    <br>
                </div>
                <button class="buttonHome" v-on:click="route()">Back to Home</button>
            </aside>
        </div>
        
        
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            datapacket: [],
            rating: ""
        }
    },
    props: {
        name : {
            type: String
        }
    },
    methods: {
        route:function() {
            this.$router.push({name: 'account'})
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
            database.collection('ratings').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    if (doc.data().restaurant_name == this.$route.params.name) {
                        var rating = doc.data()["avg"];
                        this.rating = rating;
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

.content {
    width: calc(100% - 8rem);
    margin: auto;
    align-items: left;
    font-size: 15px;
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
#container {
    width: 100%;
    overflow: hidden;
}
#navigationbar {
    font-size:20px;
    margin-left:2%;
    float: left;
    width: 10%;
}
#picture {
    float: left;
    width: 80%;
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

li {
    flex-grow: 1;
    flex-basis: 100px;
    text-align: center;
}

.naviBar li {
    list-style-type: none;
    padding: 0;
    text-decoration: none;
    text-align:left;
}

#current p{
    font-weight: bold;
    background-color: rgba(224, 116, 114, 0.64);
}

#navigationbar {
    font-size: 20px;
    margin-left: 5%;
    float: left;
    width: 10%;
}

a {
    text-decoration: none;
}

.naviBar p{
    color:black;
}

.naviBar p:hover {
    background-color:#90141C;
    color:white;
}

.buttonHome {
    background-color: #EBA4A4;
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}

.buttonHome:hover {
    background-color:#90141C;
    color:white;
}
</style>