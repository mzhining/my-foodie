<template>
    <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <h1> {{this.rname}} </h1>
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
                    <li><router-link to="/ordertoReservation" exact><p>Reservation</p></router-link></li>
                    <li id = "current"><router-link to="/ordertoPickup" exact><p>Pick up</p></router-link></li>
                </ul>
            </div>
            <aside id="picture">
                <div class="content" align = "left">
                    <p> Your order for {{this.datapacket.restaurant_name}} for {{this.$userData.postal_code}} is complete. <br>
                        Your food will be ready for pick-up at {{this.time}}. <br>
                        Thank you for ordering {{this.datapacket.restaurant_name}} with MyFoodie!</p>
                        <br>
                        <br>
                </div>
                <button class="buttonHome" v-on:click="route()">Back to Home</button>
            </aside>
        </div>
        
        
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    name : 'PickupConfirmation',
    data(){
        return{
          datapacket:[],
        }
    },
    props : {
      rname : {
          type : String
      }, 
      time : {
          type : String
      },
      docIdRes : {
          type : String
      }
    },
    created:function(){
        this.fetchItems();
    },
    methods:{
        route:function() {
            this.$router.push({name: 'home'})
        },
      fetchItems:function(){
        database.collection('pickup')
        .doc(this.docIdRes)
        .get()
        .then(snapshot => {
            var data = snapshot.data()
            this.datapacket = data
            console.log(this.datapacket)
        });
      }
    }
}
</script>

<style scoped>

img {
    height: 10rem;
}

.content {
    width: calc(100% - 8rem);
    margin: auto;
    display: flex;
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
    float: right;
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
