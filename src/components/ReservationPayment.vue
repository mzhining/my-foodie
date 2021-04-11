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
            <aside id="picture">
            <div class="content" align = "left">
                <div> 
                <h1 align="left"> Confirm and make your payment </h1>
                <br>
                <table id="firstTable">
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" v-bind:key="item.id">
                            <td>{{item[0]}}</td>
                            <td>{{item[1]}}</td>
                            <td>${{item[2]}}</td>
                        </tr>
                    </tbody>
                </table>
                <p> <b>Total price: ${{this.$route.params.total}}</b></p>
                <p> Payment method </p>
                    <select v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option>Debit Card</option>
                    <option>Credit Card</option>
                    <option>Paylah!</option>
                    </select>
                    <br>
            </div>
            </div>
            <div class = "bottom" align = "center">
                <br>
                <br>
                <button class="special" v-on:click="route()"> Make Payment </button>
                <br>
                <br>
            </div>
        </aside>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data(){
        return{
          datapacket:[],
          items: []
        }
    },
    props : {
        name : {
            type : String
        }
    },
    created() {
        this.fetchItems();
    },
    methods:{
        route:function() {
            this.$router.push({ name: 'reservationComplete', params: {name: this.$route.params.name, id: this.$route.params.id, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal}})
        },
        fetchItems:function(){
            this.items = this.$route.params.itemsSelected;
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
    }
}
</script>

<style scoped>
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #90141C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: center;
  background: #90141C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #90141C;
}

table td:last-child {
  border-right: none;
}

table tbody tr:nth-child(2n) td {
  background: #f4c2c2;
}

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
#current p{
    font-weight: bold;
    background-color: rgba(224, 116, 114, 0.64);
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
    /* border: 1px solid #222;  */
}
.special {
    background-color: #EBA4A4;
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}

.special:hover {
    background-color:#90141C;
    font-size:15px;
    color:white;
}

.naviBar li {
    list-style-type: none;
    padding: 0;
    text-decoration: none;
    text-align:left;
}

#navigationbar {
    /* text-align: left; */
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
</style>
