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
        <h1>My Profile</h1>
        <h2>Favourite Restaurant</h2>
        <div id="fav">
            <!-- <li v-for="item in fav" v-bind:key="item.id" class="box">
                <span>{{item}}</span>
            </li> -->
            <!-- <br><br> -->
            <!-- how to disply picture using a fr loop, now the array fav_img has all element as the weblink-->
            <li v-for="item in fav_img" v-bind:key="item.id" class="box" v-on:click="route()"> 
                <img v-bind:src="item" alt="error" class="box-pic" /> 
                <span>     </span>
            </li>
        </div>
        <h2>Pickup Order</h2>
        <div class="section">
            <div id="multi_pickup">
                <table style="width:100%" >
                    <tr id="headingPickup">
                        <th>Restaurant<br></th>
                        <th>Time<br></th>
                        <th>Order<br></th>
                        <th>Total<br></th>
                        <th>Edit<br></th>
                    </tr>
                    <tbody>
                    <tr v-for="oneOrder in pickups" v-bind:key="oneOrder.id">
                        <td>{{oneOrder.restaurant_name}}</td>
                        <td>{{oneOrder.date}} {{oneOrder.time}}</td>
                        <td>
                            <ul v-for="item in oneOrder.one_order" v-bind:key="item.name">
                                <span>{{item.count}}x {{item.name}}</span>
                            </ul>
                        </td>
                        <td>${{oneOrder.total}}</td>
                        <td><button v-bind:id="oneOrder.doc_id"  v-on:click="deleteItemPickUp($event, oneOrder.order_index, oneOrder.total_orders)">Delete</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br>
        </div>
        <h2>Reservation</h2>
        <div class="section">
            <div id="multi_reservations">
                <table style="width:100%" >
                    <tr id="headingReser">
                        <th>Restaurant<br></th>
                        <th>Time<br></th>
                        <th>Pax<br></th>
                        <th>Order<br></th>
                        <th>Edit<br></th>
                    </tr>
                    <tbody>
                    <tr v-for="oneReser in reservations" v-bind:key="oneReser.id">
                        <td>{{oneReser.restaurant_name}}</td>
                        <td>{{oneReser.date}} {{oneReser.time}}</td>
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
            </div>
        </div>
        <h2> Ratings </h2>
        <div class="section"> 
            <table style="width:100%" >
                <tr>
                    <th> Restaurant </th>
                    <th> Your Rating </th>
                    <th> Change Rating </th>
                </tr>
                <tbody>
                    <tr v-for="(value, key) in ratings" v-bind:key="key">
                        <td> {{key}} </td>
                        <td> {{value}} </td>
                        <td> <input type="number" v-bind:id="key" min=1 max=5 /><br><button v-on:click="rate($event)" v-bind:restaurant="key" v-bind:current="value"> Change Rating </button> </td>
                    </tr>
                    <tr v-for="restaurant in notRated" v-bind:key="restaurant">
                        <td> {{restaurant}} </td>
                        <td> Not Rated </td>
                        <td> <input type="number" v-bind:id="restaurant" min=1 max=5 /><br><button v-on:click="rate($event)" v-bind:restaurant="restaurant" v-bind:current=0> Rate </button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="blank">
            <p> </p>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            fav:[],
            fav_img:[],
            fav_html:[],
            customer:{},
            reservations:[],
            userEmail:"",
            pickups:[],
            ratings: {},
            notRated: [],
            custId: ""
        }
    },
    methods:{
        rate: function(event) {
            var restaurant = "";
            restaurant = event.target.getAttribute("restaurant");
            let current = Number(event.target.getAttribute("current"));
            let docid = "";
            let newRating = Number(document.getElementById(restaurant).value);
            let changeRating = {};
            if (newRating >= 1 && newRating <= 5) {
                database.collection('ratings').get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        if (doc.data().restaurant_name == restaurant) {
                            changeRating = doc.data();
                            docid = doc.id;
                            changeRating["total"] = changeRating["total"] - current + newRating;
                            if (current == 0) {
                                changeRating["ratedBy"] = changeRating["ratedBy"] + 1;
                            }
                            changeRating["avg"] = Number((changeRating["total"]/changeRating["ratedBy"]).toFixed(2));
                            this.customer.ratings[restaurant] = newRating;
                            database.collection('customers').doc(this.custId).update(this.customer).then(database.collection('ratings').doc(docid).update(changeRating).then(this.fetchItems()));
                        }
                    }); 
                });
            } else {
                console.log("Rating should be between 1 and 5!")
            }
        },
        route:function(){
            this.$router.push({name:'order-to-delivery'});
        },
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
            }).then(this.fetchItems());
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
            }).then(this.fetchItems());
        },
        fetchItems: function() {
            this.fav=[];
            this.fav_img=[];
            this.fav_html=[];
            this.customer={};
            this.reservations=[];
            this.userEmail="";
            this.pickups=[];
            this.ratings={};
            this.notRated=[];
            this.custId="";
            database.collection("customers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data()["email"] == this.$userId){
                        this.custId = doc.id;
                        this.ratings = doc.data()['ratings'];
                        database.collection("restaurants").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (!Object.keys(this.ratings).includes(doc.data()["restaurant_name"])) {
                                    this.notRated.push(doc.data()["restaurant_name"]);
                                }
                            }); 
                        });
                        this.customer=doc.data();
                        this.fav=doc.data()['favourites'];
                        this.reservations=doc.data()['reservation'];
                        for (let i = 0; i < this.fav.length; i++) {
                            database.collection("restaurants").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (doc.data()["restaurant_name"] == this.fav[i]){
                                        this.fav_img.push(doc.data()["image"]);
                                    }
                                }); 
                            });
                        }
                        this.pickups=[];
                            database.collection("pickup").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    var thisRestaurant=doc.data();
                                    for (let j = 0; j <doc.data()["orders"].length; j++) {
                                        var thisPU=doc.data()["orders"][j];
                                        if (this.$userId==thisPU["email"]){
                                            var onePU={};
                                            onePU["doc_id"]=doc.id;
                                            onePU["order_index"]=j;
                                            onePU["restaurant_name"]=thisRestaurant.restaurant_name;
                                            onePU["date"]=thisPU["date"];
                                            onePU["time"]=thisPU["time"];
                                            onePU["total"]=thisPU["total"];
                                            onePU["total_orders"]=doc.data()["orders"];
                                            onePU["one_order"]=thisPU["one_order"];
                                            this.pickups.push(onePU);
                                        }
                                    }
                                }); 
                            });
                        this.reservations=[];
                            database.collection("reservations").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    var thisRestaurant=doc.data();
                                    for (let j = 0; j <doc.data()["slots"].length; j++) {
                                        var thisSlot=doc.data()["slots"][j];
                                        for (let z=0;z<thisSlot["reservedBy"].length;z++){
                                            if (this.$userId==thisSlot["reservedBy"][z]){
                                                var oneReser={};
                                                oneReser["doc_id"]=doc.id;
                                                oneReser["slots_array"]=doc.data()["slots"];
                                                oneReser["slot_index"]=j;
                                                oneReser["order_index"]=z;
                                                oneReser["restaurant_name"]=thisRestaurant.restaurant_name;
                                                oneReser["pax"]=thisSlot["pax"][z];
                                                oneReser["date"]=thisSlot["date"];
                                                oneReser["time"]=thisSlot["time"];
                                                oneReser["orders"]=thisSlot["orders"][z];
                                                this.reservations.push(oneReser);
                                            }
                                        }
                                    }
                                }); 
                            });
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

#header {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;

}

#headingPickup {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;
    margin-left: 2%;

}
#headingReser{
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
#itemlist {
    font-size:15px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}
#multi_pickup {
    text-align: left;
}

.section {
    /* background-color:rgb(198, 204, 204); */
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
.box-pic { 
    height:80px;
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

