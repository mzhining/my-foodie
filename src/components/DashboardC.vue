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
            <li v-for="item in fav" v-bind:key="item.id" class="box">
                <span>{{item}}</span>
            </li>
            <br><br>
            <!-- how to disply picture using a fr loop, now the array fav_img has all element as the weblink-->
            <li v-for="item in fav_img" v-bind:key="item.id" class="box"> 
                <img v-bind:src="item" alt="error"/> 
                <span>     </span>
            </li>
        </div>
        <h2>Pickup Order</h2>
        <div class="section">
            <div id="multi_pickup">
                <table style="width:100%" >
                    <tr id="headingPickup">
                        <th><br>Restaurant<br></th>
                        <th><br>Time<br></th>
                        <th><br>Order<br></th>
                        <th><br>Total<br></th>
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
                <!--
                <ul id="pickups" v-for="onePickup in orders" v-bind:key="onePickup.id">
                    <p id="header">{{onePickup.restaurant}} -- {{onePickup.type}}</p>
                    <li v-for="item in onePickup.one_order" v-bind:key="item.id" id="itemlist">
                        <span>{{item.qty}}x {{item.item}}</span>
                        <br>
                    </li>`
                    <br>
                </ul>-->
            </div>
            <br>
        </div>
        <h2>Reservation</h2>
        <div class="section">
            <div id="multi_reservations">
                <table style="width:100%" >
                    <tr id="headingReser">
                        <th><br>Restaurant<br></th>
                        <th>Time</th>
                        <th><br>Pax<br></th>
                        <th><br>Order<br></th>
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
                <!--
                <ul id="reservations" v-for="oneReser in reservation_orders" v-bind:key="oneReser.id">
                    <p id="header">{{oneReser.restaurant_name}} -- reservation</p>
                    <div id="block" v-for="(key, value) in oneReser.orders" v-bind:key="key">
                        <span>{{key}}x {{value}}</span>  <br>
                    </div>
                    <br><br>
                </ul>-->
            </div>
        </div>
        <!--I try to use a dummy div and set the height to 700px, 
        to leave a 700px blank, but still cannot make the footer to the bottom -->
        <div id="blank">
            <p> </p>
        </div>
        <!--<router-link to="/accountR" exact>Go to DashboardR </router-link>-->
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders: [],//to store multiple pickup
            fav:[],
            fav_img:[],
            fav_html:[],
            customer:{},
            reservations:[],//to store muptiple reservations
            reservation:{},
            ///////////////////////////////////////////////////
            //use the document janedoe as sample display!!!!
            //assume one people can only have one reservation, since the reservation in customer document is a map rather than an array
            //and other document in customers does not have reservation feild.
            //For pickup, it is stored in cart attribute in the document
            reservation_order:{},
            reservation_orders:[],//store muptiple order information for reservations
            userEmail:"",
            pickups:[]
        }
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
            }).then(() => {location.reload()});
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
                    for (let j = 0; j <slot_array[i].length; j++) {
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
            }).then(() => {location.reload()});
        },
        fetchItems: function() {
            database.collection("customers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    ///////////////////////////////////////////////////////////////////////
                    //doc.data()["email"] == this.$userId :
                    //here I use janedoe customer as example, but actually it should be a global variable!
                    //if (doc.data()["email"] == "janedoe@email.com"){
                    if (doc.data()["email"] == this.$userId){
                        this.customer=doc.data();
                        this.fav=doc.data()['favourites'];
                        //this.orders=doc.data()['cart'];//store multiple pickup
                        this.reservations=doc.data()['reservation'];//store multiple reservations
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
                                            //oneReser["time"]=thisSlot["date"]+" "+thisSlot["time"];
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
                                                //oneReser["time"]=thisSlot["date"]+" "+thisSlot["time"];
                                                oneReser["orders"]=thisSlot["orders"][z];
                                                this.reservations.push(oneReser);
                                            }
                                        }
                                    }
                                }); 
                            });
                        ///////////////////////////////////////////////
                        //to get the reservations of this customer
                        //for (let i = 0; i < this.reservations.length; i++) {
                        //    database.collection("reservations").get().then((querySnapshot) => {
                        //        querySnapshot.forEach((doc) => {
                        //            if (doc.data()["restaurant_name"] == this.reservations[i].restaurant_name){
                        //                //alert("here1");
                        //                for (let j = 0; j <doc.data()["slots"].length; j++) {
                        //                    var thisSlot=doc.data()["slots"][j];
                        //                    if ((this.reservations[i].date==thisSlot.date) && (this.reservations[i].time==thisSlot.time)){
                        //                        for (let z=0;z<thisSlot["reservedBy"].length;z++){
                        //                            if (this.reservations[i].customerID==thisSlot["reservedBy"][z]){
                        //                                this.reservation_order={};
                        //                                this.reservation_order["orders"]=thisSlot.orders[z];
                        //                                this.reservation_order["restaurant_name"]=this.reservations[i].restaurant_name;
                        //                                this.reservation_order["datetime"]=this.reservations[i].date+this.reservations[i].time;
                        //                                this.reservation_orders.push(this.reservation_order);
                        //                            }
                        //                        }
                        //                    }
                        //                }
                                        //var idindex=parseInt(this.reservation.id);
                                        /////////////////////////////////////////////////////////////////////////////
                                        //assume that it only retrieve from slots[0], so we need 2 index to decide which reservation the customer has
                                        //this.reservation_order=doc.data().slots[0].orders[idindex];
                        //            }
                        //        }); 
                        //    });
                        //}
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
    height: 15rem;
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
    font-size:20px;
    text-align: left;
    margin-left:3px;
}
#itemlist {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}
#multi_pickup {
    text-align: left;
}

.section {
    background-color:rgb(198, 204, 204);
    margin-left: 10%;
    margin-right: 10%;
    border-radius: 10px;
}
#block {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}
.blank {
    height:700px;
}
.box { 
    display: inline; 
    margin-left: 5px;
    margin-right: 5px;
}
button {
    font-size:15px;
}
</style>

