<template>
    <div>
        <h1> Make a reservation for Jollibee at S(828761) </h1>
        <label> Number of pax: </label>
        <input type="number" placeholder=0 min="0" max="8" v-model.lazy="reservation.pax" required/>
        <br>
        <label> Date: </label>
        <input id="datefield" type="date" v-model.lazy="reservation.date" required/>
        <br>
        <label> Time: </label>
        <input type="time" v-model.lazy="reservation.time" min="10:00" max="21:00" required/>
        <br>
        <button v-on:click="book"> Book </button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            reservation: {}
        }
    },
    methods: {
        book: function() {
            database.collection('reservations').add(this.reservation);
        }
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