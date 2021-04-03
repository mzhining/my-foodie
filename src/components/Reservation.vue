<template>
    <div>

        <h1> Make a reservation for {{this.$route.params.id}} at {{this.data.postal}} </h1>
        <label> Number of pax: </label>
        <br>
        <input type="number" min="1" max="8" v-model.lazy="reservation.pax" required/>
        <br>
        <br>
        <label> Date: </label>
        <br>
        <input id="datefield" type="date" v-model.lazy="reservation.date" min="2021-03-14" required/>
        <br>
        <br>
        <button v-on:click="selectDate"> Show available timeslots </button>
        <br>
        <br>
        <label v-if="show==true"> Time: </label>
        <br>
        <ul>
            <li v-for="slot in available" v-bind:key="slot.time">
                <p> {{slot.time}} </p>
                <button v-on:click="book($event)" v-bind:time="slot.time"> Book </button>
            </li>
        </ul>
        <br>
        <br> -->
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
            orderNumber: 100
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
                    //this.data.slots[i]["reservedBy"].push(this.$userId);
                    this.data.slots[i]["reservedBy"].push("customerID");
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
</style>