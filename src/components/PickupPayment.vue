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
                    <div>
                        <h1> Confirm and make your payment </h1>
                        <table id="firstTable">
                            <thead>
                                <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,i) in this.datapacket.orders[this.datapacket.orders.length - 1].one_order" :key="i">
                                    <td>{{row.name}}</td>
                                    <td>{{row.count}}</td>
                                    <td>${{row.price}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p> Total price: ${{this.datapacket.orders[this.datapacket.orders.length - 1].total}}</p>
                        <p> This order is for <b> pickup </b> at {{this.time}}</p>
                        <br>
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
                    <button class = "special" v-on:click="route()"> Make Payment </button>
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
    name : 'Pickup',
    data(){
        return{
          datapacket:[]
        }
    },
    props : {
      total : {
          type : String
      }, 
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
            this.$router.push({ name: 'pickup-confirmation', params : {rname : this.rname, time : this.time, docIdRes : this.docIdRes}})
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
