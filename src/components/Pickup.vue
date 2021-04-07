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
                    <div class = "menu">
                        <h1> Choose your order </h1>
                        <br>
                        
                        <li v-for="item in items" v-bind:key="item.name" id="section">
                        <br>
                        <p id="food">Name: {{item.name}}    
                            <br> Price: ${{item.price}}
                            </p> 
                            <img v-bind:src="item.image" id = "menupic"/>  
                            <QuantityCounter v-bind:item="item" v-on:counter="onCounter"> </QuantityCounter> 
                        <br> 
                        </li>
                    </div>
                    <div id="basket">
                    <p>Basket:</p>
                        <ul id="display">
                            <li v-for="item in itemsSelected" v-bind:key="item.id">
                                <p>{{item[0]}} x {{item[1]}} </p>
                            </li>
                        </ul>
                        <br>
                        <br>
                        <p> Total: ${{total}}</p>
                        <br><br>
                    </div>
                    <div class = "time" align = "center"> 
                        <p> When will you be picking up? </p>
                        <label> Date: </label>
                        <br>
                        <input id="datef" type="date" v-model.lazy="selectedDate" required/>
                        <br>
                        <br>
                        <select v-model="selectedTime">
                                <option disabled value="">Please select one</option>
                                <option>10.00 AM</option>
                                <option>11.00 AM</option>
                                <option>12.00 AM</option>
                                <option>01.00 PM</option>
                                <option>02.00 PM</option>
                                <option>03.00 PM</option>
                                <option>04.00 PM</option>
                                <option>05.00 PM</option>
                                <option>06.00 PM</option>
                                <option>07.00 PM</option>
                                <option>08.00 PM</option>
                                </select>
                                <br>
                                <br>
                    </div>
                </div>
                
                <div class = "bottom" align = "center">
                    <br>
                    <button id = "special" v-on:click="checkForm(), sendOrder(), findTotal()" > Order! </button>
                    <br>
                    <br>
                </div>
            </aside>
        </div>
        
        
    </div>
</template>

<script>
import database from "../firebase.js"
import QuantityCounter from './QuantityCounter.vue'
import firebase from 'firebase'

export default {
    name : 'Pickup',
    data(){
        return{
            selectedTime : '',
            selectedDate: '',
            subTotal : 0, 
            orderList : [],
            datapacket: [],
            itemsSelected:[],
            oneOrder : [],
            pastOrder : [],
            docId : '',
            mindate: "",
            items: [],
            total: 0
        }
    },
    props : {
      rname : {
          type : String
      }
    },
    components : {
        QuantityCounter
    },
    methods:{
        checkForm:function(e) {
            if(this.selectedTime && this.selectedDate) 
                return true;
            if(!this.selectedTime || this.selectedDate) 
                alert("Please choose your pick up time and date")
            e.preventDefault();
        },
        fetchItemsfromCustomer:function(){
            database.collection('customers')
            .get()
            .then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    if (doc.data().email == this.$userId){
                        this.pastOrder = doc.data().cart;
                        this.docId = doc.id;
                    }
                })
            })
        }, 
        fetchItems:function(){
            database.collection('pickup')
            .doc(this.rname)
            .get()
            .then(snapshot => {
                var data = snapshot.data()
                this.datapacket = data
                var data2 = snapshot.data().orders
                this.orderList = data2
            });
            database.collection('restaurants').get().then(querySnapshot => {
                let item={};
                querySnapshot.docs.forEach(doc => {
                    if (doc.data().restaurant_name == this.rname) {
                        item=doc.data();
                        item.show=false;
                        this.items = item["menu"];
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
            document.getElementById('datef').setAttribute('min', this.mindate);
        }, 
        sendOrder : function() {
            this.getOrder();
            this.sendToUser();

            database.collection('pickup')
            .doc(this.rname)
            .update({orders : this.orderList})
            .then(()=>{this.$router.push({ name: 'pickup-payment', params : {total : this.subTotal, rname : this.rname, time : this.selected}})});
        },

        sendToUser : function() {
            database.collection('customers')
            .doc(this.docId)
            .update({cart : this.pastOrder});
        },

        getOrder : function() {
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.oneOrder.push({
                    name : this.itemsSelected[i][0], 
                    count : this.itemsSelected[i][1], 
                    price : this.itemsSelected[i][2]
                })
            }
            this.updatePastOrder();
            this.orderList.push({
                email : this.$userId, 
                one_order : this.oneOrder, 
                total : this.subTotal,
                time : this.selectedTime,
                date: this.selectedDate
            })
        },

        updatePastOrder : function() {
            this.pastOrder.push({
                time : this.selectedTime,
                date: this.selectedDate,
                one_order : this.oneOrder,
                restaurant : this.rname,
                total : this.subTotal,
                type : 'pickup'
            })
        },
        onCounter: function (item, count) {
            var doneAction = false; 
            if (this.itemsSelected.length === 0 && count > 0) {
            //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
                doneAction = true;

            } else {
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name===item.name && count > 0) {
                        this.itemsSelected.splice(i,1);
                        this.itemsSelected.push([item.name, count, item.price]);
                        doneAction = true;
                        break;
                    }
                    
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name===item.name && count === 0) {
                        this.itemsSelected.splice(i,1);
                        doneAction = true;
                        break;
                    }
                }
                // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                if (!(doneAction) && count != 0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        }
    },
    watch: {
        itemsSelected: function() {
            var sub = 0;
            for (var i = 0; i < this.itemsSelected.length; i++) {
                sub += this.itemsSelected[i][2] * this.itemsSelected[i][1];
            }
            this.total = sub;
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
                    this.fetchItemsfromCustomer();
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

<style scoped>
img {
    height: 10rem;
}

#menupic {
    height: 5rem;
}

.content {
    width: calc(100% - 8rem);
    margin: auto;
    /* display: flex; */
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
#food {
    font-size:15px;
    font-weight: bold;
    margin-left: 15px;
}
/* 
#menu {
    float: left;
} */
#section {
    background-color:rgb(255, 237, 188);
    margin-bottom: 20px;
    border-radius: 10px;
    list-style-type: none;
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

</style>
