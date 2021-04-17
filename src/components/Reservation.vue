<template>
    <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <!-- <h1> {{this.$route.params.id}} </h1> -->
                <h1> {{this.name}} </h1>
                <img v-bind:src="this.datapacket.image" class = "icon"/>  
            </div>
            
            <div class="side-bar" align="left">
                <br>
                <p><b>Restaurant Name:</b> {{this.datapacket.restaurant_name}}</p>
                <p><b>Rating: </b>⭐️ {{this.rating}} </p>
                <p><b>Address: </b> {{this.datapacket.address}}</p>
                <p><b>Contact Email:</b>  {{this.datapacket.contact_email}}</p>
                <p><b>Contact Number:</b>  {{this.datapacket.contact_num}}</p>
                <p><b>Postal Code:</b>  {{this.datapacket.postal_code}}</p>
                <button v-on:click="addFav()" id="addToFav">Add to favourite</button>
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
            <div class = "con1">

                <h1> Make a reservation for {{this.$route.params.name}} at {{this.data.postal}} </h1>
                <label> Number of pax: </label>
                <br>
                <input type="number" min="1" max="8" v-model.lazy="reservation.pax" required/>
                <br>
                <br>
                    <div id = "dateDiv">
                        <label> Date: </label>
                        <br>
                        <div id="dateInput">
                            <input id="datefield" type="date" v-model.lazy="reservation.date" required/>
                        </div>
                        <br>
                    </div>
                <br>
                <button v-on:click="selectDate" id="showSlots"> Show available timeslots </button>
                <br>
                <br>
                <div id="timeslots"> 
                    <label v-if="show==true"> Time: </label> 
                    <ul id = "book-slots">
                        <li v-for="slot in available" v-bind:key="slot.time" id="one-book">
                            <p> {{slot.time}} </p>
                            <button class="special" v-on:click="book($event)" v-bind:time="slot.time"> Book </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'
import firebase from 'firebase'

export default {
    data() {
        return {
            reservation: {},
            available: [],
            show: false,
            data: {},
            slotNumber: 100,
            orderNumber: 100,
            datapacket: [],
            mindate: "",
            doc_id: "",
            rating: "",
            contact_num: "",
            contact_email :""
        }
    },
    props : {
      name : {
          type : String
      }
    },
    methods: {
        addFav:function(){
            var fav=this.$userData["favourites"];
            //alert(this.$route.params.name);
            if (!fav.includes(this.$route.params.name)){
                fav.push(this.$route.params.name);
            }
            database.collection('customers').doc(this.$userUid).update({
                favourites: fav
            }).then(() => {location.reload()});
                
        },
        fetchItems: function() {
            let item = {};
            database.collection('reservations').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    if (doc.data().restaurant_name == this.$route.params.name) {
                        item = doc.data();
                        this.data = item;
                        this.doc_id = doc.id;
                    }
                });
            });
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
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1)
            var dd = tomorrow.getDate();
            var mm = tomorrow.getMonth()+1; //January is 0!
            var yyyy = tomorrow.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            tomorrow = yyyy+'-'+mm+'-'+dd;
            this.mindate = tomorrow;
            document.getElementById('datefield').setAttribute('min', this.mindate);
        },
        book: function(event) {
            if (this.$userProfile == 'restaurant') {
                alert('Please log in using a customer account to book!');
            } else {
                let time = event.target.getAttribute("time");
                this.reservation.time = time;
                this.reservation.pax = Number(this.reservation.pax);
                for (let i = 0; i < this.data.slots.length; i++) {
                    if (this.data.slots[i]["date"] == this.reservation.date && this.data.slots[i]["time"] == this.reservation.time) {
                        this.data.slots[i]["orders"].push({});
                        this.slotNumber = i;
                        this.orderNumber = this.data.slots[i]["orders"].length - 1;
                        this.data.slots[i]["pax"].push(this.reservation.pax);
                        this.data.slots[i]["reservedBy"].push(this.$userId);
                        this.data.slots[i]["avail"]--;
                        this.data.slots[i]["contact"].push(this.$userData.contact);
                    }
                }
                database.collection('reservations').doc(this.doc_id).update(this.data).then(
                    this.$router.push({ name: 'reservationConfirmed', params: {name: this.$route.params.name, id: this.doc_id, pax: this.reservation.pax, date: this.reservation.date, time: this.reservation.time, postal: this.data.postal, data: this.data, slotNumber: this.slotNumber, orderNumber: this.orderNumber}}));
            }
            // let time = event.target.getAttribute("time");
            // this.reservation.time = time;
            // this.reservation.pax = Number(this.reservation.pax);
            // for (let i = 0; i < this.data.slots.length; i++) {
            //     if (this.data.slots[i]["date"] == this.reservation.date && this.data.slots[i]["time"] == this.reservation.time) {
            //         this.data.slots[i]["orders"].push({});
            //         this.slotNumber = i;
            //         this.orderNumber = this.data.slots[i]["orders"].length - 1;
            //         this.data.slots[i]["pax"].push(this.reservation.pax);
            //         this.data.slots[i]["reservedBy"].push(this.$userId);
            //         this.data.slots[i]["avail"]--;
            //         this.data.slots[i]["contact"].push(this.$userData.contact);
            //     }
            // }
            // database.collection('reservations').doc(this.doc_id).update(this.data).then(
            //     this.$router.push({ name: 'reservationConfirmed', params: {name: this.$route.params.name, id: this.doc_id, pax: this.reservation.pax, date: this.reservation.date, time: this.reservation.time, postal: this.data.postal, data: this.data, slotNumber: this.slotNumber, orderNumber: this.orderNumber}}));
        },
        selectDate: function() {
            this.reservation.date = this.reservation.date.toString();
            var selectedDate = this.reservation.date;
            let availSlots = [];
            for (let i = 0; i < this.data.slots.length; i++) {
                if (this.data.slots[i]["date"] == selectedDate && this.data.slots[i]["avail"] > 0) {
                    availSlots.push(this.data.slots[i]);
                }
            }
            this.available = availSlots;
            this.show = true;
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$userUid = user.uid;
                database.collection('restaurants').doc(this.$userUid).get().then((doc) => {
                    if (doc.exists) {
                        this.$userData = doc.data();
                        this.$userId = this.$userData.email;
                        this.$userProfile = this.$userData.profile;
                        // console.log('rest exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                    } else {
                        // console.log('not restaurant, search customer db');
                        database.collection('customers').doc(this.$userUid).get().then((doc) => {
                            console.log(doc.data());
                            if (doc.exists) {
                                this.$userData = doc.data();
                                this.$userId = this.$userData.email;
                                this.$userProfile = this.$userData.profile;
                                // console.log('cust exists', this.$userUid, this.$userId, this.$userProfile, this.$userData);
                            }
                        })
                    }

                    // insert functions here
                    this.fetchItems();
                })
            } else {
                // console.log('not logged in');
                this.$userUid = '';
                this.$userData = '';
                this.$userId = '';
                this.$userProfile = '';
            }
        })
    }
}

</script>

<style>
#one-book {
    align-items:center;
    background-color: blanchedalmond;
    border : none;
    border-radius: 10px;
    margin: 5px 5px 5px 5px;   
}

#book-slots {
    width: 80%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;

}

img {
    height: 10rem;
}

#menupic {
    height: 5rem;
}

.con1 {
    width: calc(100% - 8rem);
    /* margin: auto; */
    /* margin-left:15%; */
    /* display: block; */
    /* align-items: center; */
    font-size: 15px;
}

#timeslots ul {
    width: calc(100% - 8rem);
    margin: auto;
    margin-left:20%;
    align-items: center;
    font-size: 15px;
}

#timeslots label{
    margin-left:10%;
}

#basket {
    margin-left: 5%;
    margin-right: 5%;
    text-align:center;
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

.time {
    border: 1px solid black;
    border-radius: 10px;
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
#dateInput{
    text-align:center;
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

#current p{
    font-weight: bold;
    background-color: rgba(224, 116, 114, 0.64);
}

#food {
    font-size:15px;
    font-weight: bold;
    margin-left: 15px;
}

#section {
    background-color:rgb(255, 237, 188);
    margin-bottom: 20px;
    border-radius: 10px;
    list-style-type: none;
    padding-bottom:10px;
    padding-top:10px;
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
#addToFav {
    background-color: blanchedalmond;
    font-size:15px;
    border:none;
    border-radius: 5px;
    padding: 8px;
}
#addToFav:hover {
    background-color:#EBA4A4;
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

#showSlots {
    background-color:#EBA4A4;
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}

#showSlots:hover {
    background-color:#90141C;
    color:white;
}

</style>