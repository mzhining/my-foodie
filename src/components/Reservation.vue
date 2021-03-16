<template>
    <div>
        <h1> Make a reservation for Jollibee at S(828761) </h1>
        <label> Number of pax: </label>
        <br>
        <input type="number" placeholder=0 min="1" max="8" v-model.lazy="reservation.pax" required/>
        <br>
        <br>
        <label> Date: </label>
        <br>
        <input id="datefield" type="date" v-model.lazy="reservation.date" required/>
        <br>
        <br>
        <button v-on:click="selectDate"> Show available timeslots </button>
        <br>
        <br>
        <label v-if="show==true"> Time: </label>
        <br>
        <ul>
            <li v-for="slot in available" v-bind:key="slot.id">
                <p> {{slot.time}} </p>
                <button v-on:click="book($event)" v-bind:id="slot.id"> Book </button>
            </li>
        <ul>
        <br>
        <br>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            reservation: {},
            available: [],
            allSlots: [],
            show: false;
        }
    },
    methods: {
        fetchItems: function() {
            let item = {};
            database.collection('reservations').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    item = doc.data();
                    this.allSlots.push(item);
                });
            });
        },
        book: function(event) {
            let item = {};
            let doc_id = event.target.getAttribute("id");
            item = database.collection('reservations').doc(doc_id).get();
            item.avail = false;
            item.pax = this.reservation.pax;
            this.reservation = item;
            database.collection('reservations').doc(id).update(this.reservation).then(this.$router.push('confirmReservation'));
            }
        },
        selectDate: function() {
            var selectedDate = this.reservation.date;
            let slots = [];
            for (slot in allSlots) {
                if (slot.date == selectedDate && slot.avail == true) {
                    slots.push(slot);
                }
            }
            this.available = slots;
            this.show = true;
        }
    },
    created() {
        this.fetchItems();
    }
}

var today = new Date();
var tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1)
var maxday = new Date(tomorrow);
maxday.setDate(maxday.getDate() + 7)
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
document.getElementById("datefield").setAttribute("min", tomorrow);
var maxdd = maxday.getDate();
var maxmm = maxday.getMonth()+1; //January is 0!
var maxyyyy = maxday.getFullYear();
if(maxdd<10){
    maxdd='0'+maxdd
} 
if(maxmm<10){
    maxmm='0'+maxmm
} 
maxday = maxyyyy+'-'+maxmm+'-'+maxdd;

document.getElementById("datefield").setAttribute("max", maxday);
</script>

<style>
</style>