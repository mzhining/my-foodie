<template>
    <div>
        <h1> Make a reservation for {{this.$route.params.id}} at {{this.reservation.postal}} </h1>
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
            <li v-for="slot in available" v-bind:key="slot.time">
                <p> {{slot.time}} </p>
                <button v-on:click="book($event)" v-bind:time="slot.time"> Book </button>
            </li>
        </ul>
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
            show: false
        }
    },
    methods: {
        fetchItems: function() {
            let item = {};
            database.collection('reservations').doc(this.$route.params.id).get().then((querySnapShot)=>{
                this.reservation.postal = doc.data()["postal"];
                querySnapShot.forEach(doc=>{
                    item = doc.data()["slots"];
                    this.allSlots.push(item);
                });
                }
            });
        },
        book: function(event) {
            let item = {};
            let time = event.target.getAttribute("time");
            this.reservation.time = time;
            database.collection('reservations').get().then((querySnapShot)=>{
                if (doc.data()["restaurant_name"] == this.$route.params.id) {
                    querySnapShot.forEach(doc=>{
                        for (slot in doc["slots"]) {
                            if (slot["date"] == this.reservation.date && slot["time"] == this.reservation.time) {
                                slot["orders"].push({});
                                slot["pax"].push(this.reservation.pax);
                                slot["reservedBy"].push("customerID");
                                slot["avail"]--;
                            }
                        }
                        item = doc.data()["slots"];
                        this.allSlots.push(item);
                    });
                }
            }).then(this.$router.push({ name: 'confirmReservation', params: {id: doc_id, pax: this.reservation.pax, date: this.reservation.date, time: this.reservation.time, postal: this.reservation.postal}}));
        },
        selectDate: function() {
            var selectedDate = this.reservation.date;
            let slots = [];
            for (slot in this.allSlots) {
                if (slot["date"] == selectedDate && slot["avail"] > 0) {
                    slots.push(slot);
                }
            }
            this.available = slots;
            this.show = true;
        },
        setMaxDate: function() {
            var today = new Date();
            var tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1)
            var maxday = new Date(tomorrow);
            maxday.setDate(maxday.getDate() + 7)
            var dd = tomorrow.getDate();
            var mm = tomorrow.getMonth()+1; //January is 0!
            var yyyy = tomorrow.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            tomorrow = yyyy+'-'+mm+'-'+dd;
            document.getElementById("datefield").setAttribute("min", tomorrow);
            var maxdd = maxday.getDate();
            var maxmm = maxday.getMonth()+1; //January is 0!
            var maxyyyy = maxday.getFullYear();
            if(maxdd<10){
                maxdd='0'+maxdd;
            } 
            if(maxmm<10){
                maxmm='0'+maxmm;
            } 
            maxday = maxyyyy+'-'+maxmm+'-'+maxdd;
            document.getElementById("datefield").setAttribute("max", maxday);
        }
    },
    created() {
        this.fetchItems();
        this.setMaxDate();
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