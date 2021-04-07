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
                    <li><router-link to="/delivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/reservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
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
                <p> Total price: ${{this.$route.params.total}}</p>
                <br>
                <p> Payment method </p>
                    <select v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option>Card A</option>
                    <option>Card B</option>
                    <option>Paylah!</option>
                    <option>Add Card</option>
                    </select>
                    <br>
            </div>
            <div class = "bottom" align = "center">
                <br>
                <br>
                <button id="special" v-on:click="route()"> Make Payment </button>
                <br>
                <br>
            </div>
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
    created() {
        this.fetchItems();
    },
    methods:{
        route:function() {
            this.$router.push({ name: 'reservationComplete', params: {id: this.$route.params.id, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal}})
        },
        fetchItems:function(){
            this.items = this.$route.params.itemsSelected;
            database.collection('restaurants')
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if (doc.data().restaurant_name == this.$route.params.id) {
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
#special {
    background-color: pink; 
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}
</style>
