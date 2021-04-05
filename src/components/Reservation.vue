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

                <h1> Make a reservation for {{this.$route.params.id}} at {{this.data.postal}} </h1>
                <label> Number of pax: </label>
                <br>
                <input type="number" min="1" max="8" v-model.lazy="reservation.pax" required/>
                <br>
                <br>
                <label> Date: </label>
                <br>
                <input id="datefield" type="date" v-model.lazy="reservation.date" required/>
                <br>
                <br>
                <button class="special" v-on:click="selectDate" id="showSlots"> Show available timeslots </button>
                <br>
                <br>
                <div id="timeslots">
                    <label v-if="show==true"> Time: </label>
                    <ul>
                        <li v-for="slot in available" v-bind:key="slot.time">
                            <p> {{slot.time}} </p>
                            <button id="special" v-on:click="book($event)" v-bind:time="slot.time"> Book </button>
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
            mindate: ""
        }
    },
    methods: {
        fetchItems: function() {
            let item = {};
            database.collection('reservations').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    if (doc.id == this.$route.params.id) {
                        item = doc.data();
                        this.data = item;
                    }
                });
            });
            database.collection('pickup')
            .doc(this.$route.params.id)
            .get()
            .then(snapshot => {
                var data = snapshot.data();
                this.datapacket = data;
                console.log(this.datapacket);
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
            let time = event.target.getAttribute("time");
            this.reservation.time = time;
            this.reservation.pax = Number(this.reservation.pax);
            for (let i = 0; i < this.data.slots.length; i++) {
                if (this.data.slots[i]["date"] == this.reservation.date && this.data.slots[i]["time"] == this.reservation.time) {
                    this.data.slots[i]["orders"].push({});
                    this.orderNumber = this.data.slots[i]["orders"].length - 1;
                    this.data.slots[i]["pax"].push(this.reservation.pax);
                    this.data.slots[i]["reservedBy"].push(this.$userId);
                    //this.data.slots[i]["reservedBy"].push("customerID");
                    this.data.slots[i]["avail"]--;
                }
            }
            database.collection('reservations').doc(this.$route.params.id).update(this.data).then(
                this.$router.push({ name: 'reservationConfirmed', params: {id: this.$route.params.id, pax: this.reservation.pax, date: this.reservation.date, time: this.reservation.time, postal: this.data.postal, data: this.data, slotNumber: this.slotNumber, orderNumber: this.orderNumber}}));
        },
        selectDate: function() {
            this.reservation.date = this.reservation.date.toString();
            var selectedDate = this.reservation.date;
            let availSlots = [];
            for (let i = 0; i < this.data.slots.length; i++) {
                if (this.data.slots[i]["date"] == selectedDate && this.data.slots[i]["avail"] > 0) {
                    this.slotNumber = i;
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

//note to zhenghao : 
//sorry! it can't run if i didnt comment this part, so i commented it. 
//you can fix and uncomment ! thank you ! 

// var today = new Date();
// var tomorrow = new Date(today);
// tomorrow.setDate(tomorrow.getDate() + 1)
// var maxday = new Date(tomorrow);
// maxday.setDate(maxday.getDate() + 7)
// var dd = tomorrow.getDate();
// var mm = tomorrow.getMonth()+1; //January is 0!
// var yyyy = tomorrow.getFullYear();
// if(dd<10){
//     dd='0'+dd
// } 
// if(mm<10){
//     mm='0'+mm
// } 
// tomorrow = yyyy+'-'+mm+'-'+dd;
// document.getElementById("datefield").setAttribute("min", tomorrow);
// var maxdd = maxday.getDate();
// var maxmm = maxday.getMonth()+1; //January is 0!
// var maxyyyy = maxday.getFullYear();
// if(maxdd<10){
//     maxdd='0'+maxdd
// } 
// if(maxmm<10){
//     maxmm='0'+maxmm
// } 
// maxday = maxyyyy+'-'+maxmm+'-'+maxdd;

// document.getElementById("datefield").setAttribute("max", maxday);

</script>

<style>
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

#timeslots {
    margin-left: 12%;
}

#showSlots {
    margin-left: 12%;
}
#datefield {
    margin-left: 12%;
}
</style>