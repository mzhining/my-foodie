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
                <ul>
                    <li><router-link to="/delivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/reservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
            <aside id="picture">
                <div class="content" align = "left">
                    <div>
                        <p> Please confirm your order and make a payment </p>
                        <br>
                        <table id="firstTable">
                            <thead>
                                <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,i) in this.datapacket.orders" :key="i">
                                    <td>{{row.name}}</td>
                                    <td>{{row.quantity}}</td>
                                    <td>${{row.price}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <p> Payment methods </p>
                           <select v-model="selected">
                            <option disabled value="">Please select one</option>
                            <option>Card A</option>
                            <option>Card B</option>
                            <option>Paylah!</option>
                            <option>Add Card</option>
                            </select>
                            <br>
                    </div>
                </div>
                <div class = "bottom" align = "center">
                    <br>
                    <br>
                    <button v-on:click="route()"> Make Payment </button>
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
          datapacket:[],
          rname:'Jollibee'
        }
    },
    props : {
      id : {
          type : String
      }
    },
    created:function(){
        this.fetchItems();
    },
    methods:{
        route:function() {
            this.$router.push({ name: 'pickup-confirmation'})
        },
      fetchItems:function(){
        database.collection('pickup')
        .doc(this.rname)
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
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
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

#pink-box {
    background-color: pink;
}
</style>
