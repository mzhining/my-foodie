<template> 
    <div >
        <div class="kotak-mereng">
            <div class="penyot">
                <div class="rectangle" />
                <div class="segitiga" />
            </div>
            
            <div class="kotak-mereng-content">
                <img id="pic" src="@/assets/breakfast.jpg" alt="Breakfast">
                <p id="slogan">One Stop Place for Your Stomach! </p>
            </div>
        </div>
        <hr id="line">
        <h1>Restaurant Overview</h1>
        <h2>Current Order</h2>
        <div class="section">
            <table style="width:100%" >
                <tr id="headingPickup">
                    <th>Name<br></th>
                    <th>Contact<br></th>
                    <th>Time<br></th>
                    <th>Order<br></th>
                    <th>Total<br></th>
                    <th>Edit<br></th>
                </tr>
                <tbody>
                <tr v-for="oneOrder in pickupComb" v-bind:key="oneOrder.email">
                    <td>{{oneOrder.name}}</td>
                    <td>{{oneOrder.contact}}</td>
                    <td>{{oneOrder.date}} {{oneOrder.time}}</td>
                    <td>
                        <ul v-for="item in oneOrder.orderinfo" v-bind:key="item.name">
                            <span>{{item.count}}x {{item.name}}</span>
                        </ul>
                    </td>
                    <td>${{oneOrder.total}}</td>
                    <td><button v-bind:id="oneOrder.doc_id" v-on:click="deleteItemPickUp($event, oneOrder.order_index, oneOrder.total_orders)">Delete</button></td>
                </tr>
                </tbody>
            </table>
        </div>
        <h2>Reservation</h2>
        <div class="section">
                <table style="width:100%" >
                    <tr id="headingReser">
                        <th>customer ID<br></th>
                        <th>Contact<br></th>
                        <th>Time<br></th>
                        <th>Pax<br></th>
                        <th>Order<br></th>
                        <th>Edit<br></th>
                    </tr>
                    <tbody>
                    <tr v-for="oneReser in reservationComb" v-bind:key="oneReser.id">
                        <td>{{oneReser.reservedBy}}</td>
                        <td>{{oneReser.time}}</td>
                        <td>{{oneReser.time}}</td>
                        <td>{{oneReser.pax}}</td>
                        <td>
                            <ul v-for="(key, value) in oneReser.orders" v-bind:key="key">
                                <span>{{key}}x {{value}}</span>
                            </ul>
                        </td>
                        <td><button v-bind:id="oneReser.doc_id" v-on:click="deleteItemRes($event, oneReser.slot_index, oneReser.order_index, oneReser.slots_array)">Delete</button></td>
                    </tr>
                    </tbody>
                </table>
                <compBar></compBar>
        </div>
        <br>
        
        <br>
    </div>
</template>

<script>
import database from "../firebase.js"
import BarChart from './Barchart1.vue'

export default {
    data() {
        return {
            thisRestaurant:this.$userData,
            restaurantR :{},
            restaurantP :{},
            pickup: [],
            reservationorder:[],
            name:[],
            pax:[],
            time:[],
            nameP:[],
            itemsP:[],
            timeP:[],
            pickupComb:[],
            reservationComb:[]
        }
    },
    components:{
        'compBar':BarChart
    },
    methods:{
        deleteItemPickUp:function(event, orderIndex, orders){
            let Rest_id = event.target.getAttribute("id");
            var updatedPU=[];
            for (let i = 0; i <orders.length; i++) {
                if(i!=parseInt(orderIndex)){
                    updatedPU.push(orders[i]);
                }
            }
            database.collection('pickup').doc(Rest_id).update({
                orders: updatedPU
            });
            this.fetchItems();
        },
        deleteItemRes:function(event, slot_index, order_index, slot_array){
            let thisReser = event.target.getAttribute("id");
            var updatedslots=[];
            for (let i = 0; i <slot_array.length; i++) {
                if(i!=parseInt(slot_index)){
                    updatedslots.push(slot_array[i]);
                } 
                if(i==parseInt(slot_index)){
                    var updatedS={};
                    updatedS["avail"]=slot_array[i]["avail"];
                    updatedS["date"]=slot_array[i]["date"];
                    updatedS["orders"]=[];
                    updatedS["pax"]=[];
                    updatedS["reservedBy"]=[];
                    updatedS["time"]=slot_array[i]["time"];
                    for (let j = 0; j <slot_array[i]["orders"].length; j++) {
                        if(j!=parseInt(order_index)){
                            updatedS["orders"].push(slot_array[i]["orders"][j]);
                            updatedS["pax"].push(slot_array[i]["pax"][j]);
                            updatedS["reservedBy"].push(slot_array[i]["reservedBy"][j]);
                        }
                    }
                    updatedslots.push(updatedS);
                }
            }
            database.collection('reservations').doc(thisReser).update({
                slots: updatedslots
            });
            this.fetchItems();
        },
        fetchItems: function() {
            this.reservationComb=[];
            this.pickupComb=[];
            database.collection("reservations").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data()["restaurant_name"] == this.thisRestaurant["restaurant_name"]){
                        this.restaurantR=doc.data();
                        for (var i = 0; i < doc.data()["slots"].length; i++) {
                            var oneSlot=doc.data()["slots"][i];
                            for (var j = 0; j < oneSlot.reservedBy.length; j++) {
                                var oneReser={};
                                oneReser["time"]=oneSlot.date + " "+oneSlot.time;
                                oneReser["orders"]=oneSlot.orders[j];
                                oneReser["pax"]=oneSlot.pax[j];
                                oneReser["reservedBy"]=oneSlot.reservedBy[j];
                                oneReser["doc_id"]=doc.id;
                                oneReser["slots_array"]=doc.data()["slots"];
                                oneReser["slot_index"]=i;
                                oneReser["order_index"]=j;
                                oneReser["contact"]=oneSlot.contact[j];
                                this.reservationComb.push(oneReser);
                            }
                        }
                    }

                }); 
            });
            database.collection("pickup").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => { 
                    if (doc.data()["restaurant_name"] == this.thisRestaurant["restaurant_name"]){
                        this.restaurantP=doc.data();
                        var pickupOrders=doc.data().orders;
                        for (var i = 0; i < pickupOrders.length; i++) {
                            this.nameP.push(pickupOrders[i].email);
                            var oneorderobject={};
                            for (var j=0;j<pickupOrders[i].one_order.length;j++){
                                
                                var name=pickupOrders[i].one_order[j].name;
                                var count=pickupOrders[i].one_order[j].count;
                                oneorderobject[name]=count;
                            }
                            this.itemsP.push(oneorderobject);
                            var onepickup = {};
                            onepickup["name"]=pickupOrders[i].email;
                            onepickup["contact"]=pickupOrders[i]["phone_num"];
                            onepickup["orderinfo"]=pickupOrders[i].one_order;
                            onepickup["time"]=pickupOrders[i]["time"];
                            onepickup["date"]=pickupOrders[i]["date"];
                            onepickup["doc_id"]=doc.id;
                            onepickup["order_index"]=i;
                            onepickup["total"]=pickupOrders[i]["total"];
                            onepickup["total_orders"]=doc.data()["orders"];
                            this.pickupComb.push(onepickup);
                        }
                    }

                }); 
            });
        }
    },
    created:function(){
        this.fetchItems();
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

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
  font-size: 15px;
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

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.kotak-mereng {
    position: relative;
    height: 20rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.kotak-mereng-content {
    max-width: 1300px;
    position: relative;
    width: 100%;
}
.rectangle{
    height: 5rem;
    background-color: rgba(224, 116, 114, 0.64);
}

.segitiga {
    overflow: hidden;
    height: 0;
    border-width: 10rem 100vw 0 0;
    border-style: solid;
    border-color: rgba(224, 116, 114, 0.64) transparent transparent rgba(224, 116, 114, 0.64);
}

.penyot {
    position: absolute;
    overflow: hidden;
    top: 0;
    width: 100%;
    z-index: 0;
}

#slogan {
    font-family: 'Pacifico', cursive;
    font-size: 40px;
    color: white;
    margin: 0;
    position: absolute;
    z-index: 69;
    left: 10%;
    top: 30%;
}

#pic {
    height: 17rem;
    position: absolute;
    z-index: 69;
    right: 8%;
    top: 8%;
}
#line {
    border: 3px dashed #90141C;
}

h1 {
  font-size:30px;
  color:black;
  margin-left: 10%;
  font-weight: bold;
  text-align: left;
}
h2 {
  font-size:20px;
  color:black;
  margin-left: 10%;
  text-align: left;
}

#fav {
    font-size:15px;
    list-style-type: none;
    text-align: left;
    margin-left: 10%;

}
#headingReser{
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;
    margin-left: 2%;
}
#headingPickup{
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;
    margin-left: 2%;
}
tbody {
    font-size:15px;
    text-align: left;
    margin-left:3px;
}

#header {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;
    margin-left: 2%;
}

#itemlist {
    font-size:15px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}

.section {
    margin-left: 10%;
    margin-right: 10%;
    border-radius: 10px;
}
#block {
    font-size:15px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}
.blank {
    height:700px;
}
.box { 
    display: inline; 
    margin-left: 15px;
    margin-right: 15px;
}

#heading {
    font-weight: bold;
    font-size:22px;
    text-align: left;
    margin-left: 2%;
}
#container {
    width: 100%;
    overflow: hidden;
}
#name {
    margin-left:2%;
    float: left;
    width: 15%;
}
#NoPax {
    float: left;
    width: 10%;
}
#Time {
    float: left;
    width: 25%;
}
#order {
    margin-left:5%;
    float: left;
    width: 25%;
}
#nameP {
    margin-left:2%;
    float: left;
    width: 25%;
}

#TimeP {
    float: left;
    width: 25%;
}
#orderP {
    margin-left:5%;
    float: left;
    width: 40%;
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
    font-size:15px;
}

button:hover {
    background-color: #EBA4A4;
    color: white;
}


</style>

