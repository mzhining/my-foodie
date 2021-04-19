<template>
    <div>
        <div class="restaurant_info">

            <div class="main-bar">
                <h1> {{this.rname}} </h1>
                <img v-bind:src="this.datapacket.image" class = "icon"/>  
            </div>
            
            <div class="side-bar" align="left">
                <br>
                <p><b>Restaurant Name:</b> {{this.datapacket.restaurant_name}}</p>
                <p><b>Rating: </b>⭐️ {{this.rating}} </p>
                <p><b>Address: </b> {{this.datapacket.address}}</p>
                <p><b>Contact Email:</b>  {{this.contact_email}}</p>
                <p><b>Contact Number:</b>  {{this.contact_num}}</p>
                <p><b>Postal Code:</b>  {{this.datapacket.postal_code}}</p>

                <button v-on:click="addFav()" id="addToFav">Add to favourite</button>
            </div>
        
        </div>
        <hr id="line">
        <div id="container">
            <div id="navigationbar">
                <ul class="naviBar">
                    <li><router-link to="/ordertoDelivery" exact><p>Delivery</p></router-link></li>
                    <li><router-link to="/ordertoReservation" exact><p>Reservation</p></router-link></li>
                    <li id = "current"><router-link to="/ordertoPickup" exact><p>Pick up</p></router-link></li>
                </ul>
            </div>
            <aside id="picture">
                <div class="content" align = "left">
                    <div class = "menu">
                        <h1> Choose your order </h1>
                        <div class = "product-container">
                            <ul id = "itemsList">
                                <li v-for="item in items" v-bind:key="item.name" id="section">
                                <p id="food">{{item.name}}    
                                    <br> ${{item.price}}
                                    </p> 
                                    <img v-bind:src="item.image" id = "menupic"/> <br>
                                    <QuantityCounter v-bind:item="item" v-on:counter="onCounter"> </QuantityCounter> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            <div class="content2" align = "left">
                <div id="basket">
                    <p><b>Basket:</b></p>
                        <ul id="display">
                            <li v-for="item in itemsSelected" v-bind:key="item.id">
                                <p>{{item[0]}} x {{item[1]}} </p>
                            </li>
                        </ul>
                        <br>
                        <p> <b>Total: ${{total}}</b></p>
                        <br>
                </div>

                <div class = "time" align = "center"> 
                        <h1> When will you be picking up? </h1>
                        <label> Date: </label>
                        <br>
                        <input id="datef" type="date" v-model.lazy="selectedDate" required/>
                        <br>
                        <br>
                        <label> Time: </label>
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
                
                
                <div class = "bottom" align = "center">
                    <button id = "special" v-on:click="checkForm(), sendOrder()" > Order! </button>
                    <br>
                    <br>
                </div>
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
            orderList : [],
            datapacket: [],
            itemsSelected:[],
            oneOrder : [],
            pastOrder : [],
            docId : '',
            docIdRes : '',
            mindate: "",
            items: [],
            total: 0,
            rating: "",
            contact_num: "",
            contact_email :""
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
        addFav:function(){
            var fav=this.$userData["favourites"];
            //alert(this.rname);
            if (!fav.includes(this.rname)){
                fav.push(this.rname);
            }
            database.collection('customers').doc(this.$userUid).update({
                favourites: fav
            });
                
        },
        checkForm:function(e) {
            if(this.selectedTime && this.selectedDate) 
                return true;
            if(!this.selectedTime || this.selectedDate) 
                alert("Please choose your pick up time and date")
            e.preventDefault();
        },

        // fetchItemsfromCustomer:function(){
        //     database.collection('customers')
        //     .get()
        //     .then((querySnapShot) => {
        //         querySnapShot.forEach(doc => {
        //             if (doc.data().email == this.$userId){
        //                 this.pastOrder = doc.data().cart;
        //                 this.docId = doc.id;
        //             }
        //         })
        //     })
        // }, 

        fetchItems:function(){
            database.collection('pickup')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data()["restaurant_name"] == this.rname) {
                        var data = doc.data()
                        this.datapacket = data
                        var data2 = doc.data().orders
                        this.orderList = data2
                        this.docIdRes = doc.id;
                    }
                })
            });
            database.collection('ratings').get().then((querySnapShot)=>{
                querySnapShot.forEach(doc=>{
                    if (doc.data().restaurant_name == this.rname) {
                        var rating = doc.data()["avg"];
                        this.rating = rating;
                    }
                });
            });
            
            database.collection('restaurants').get().then(querySnapshot => {
                let item={};
                querySnapshot.docs.forEach(doc => {
                    if (doc.data().restaurant_name == this.rname) {
                        item=doc.data();
                        item.show=false;
                        this.items = item["menu"];
                        this.contact_num = item["contact_num"];
                        this.contact_email = item["contact_email"];
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
            if (this.$userProfile == 'restaurant') {
                alert("Please log in using a customer account to order!")
            } else {
                this.getOrder();
    
                database.collection('pickup')
                .doc(this.docIdRes)
                .update({orders : this.orderList})
                .then(()=>{this.$router.push({ name: 'pickup-payment', 
                                                params : {total : this.total, 
                                                            rname : this.rname, 
                                                            time : this.selectedTime, 
                                                            docIdRes : this.docIdRes}})});
            }
            
            // this.getOrder();

            // database.collection('pickup')
            // .doc(this.docIdRes)
            // .update({orders : this.orderList})
            // .then(()=>{this.$router.push({ name: 'pickup-payment', 
            //                                 params : {total : this.total, 
            //                                             rname : this.rname, 
            //                                             time : this.selectedTime, 
            //                                             docIdRes : this.docIdRes}})});
        },

        getOrder : function() {
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.oneOrder.push({
                    name : this.itemsSelected[i][0], 
                    count : this.itemsSelected[i][1], 
                    price : this.itemsSelected[i][2]
                })
            }
            console.log(this.$userData);
            // console.log(this.oneOrder);
            // this.updatePastOrder();
            this.orderList.push({
                email : this.$userId, 
                one_order : this.oneOrder, 
                total : this.total,
                time : this.selectedTime,
                date: this.selectedDate,
                phone_num: this.$userData.contact
            });
        },

        // updatePastOrder : function() {
        //     this.pastOrder.push({
        //         time : this.selectedTime,
        //         date: this.selectedDate,
        //         one_order : this.oneOrder,
        //         restaurant : this.rname,
        //         total : this.total,
        //         type : 'pickup',
        //         // phone_num: this.$userData.contact
        //     })
        // },
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
                    //this.fetchItemsfromCustomer();
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

#itemsList {
    width: 100%;
    max-width: 100%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

#section {
    /* width: 50px; */
    float: left;
    background-color:white;
    border-radius: 10px;
    border : 2px solid;
    border-color:#90141C;
    /* background-color:#FFEBCD; */
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    list-style-type: none;
    padding:10px 10px 10px 10px;
    display: grid; 
    grid-template-rows: 1fr 1fr;
    text-align:center;
}
#menupic {
    height: 5rem;
    display: block;
    margin-left: auto;
    margin-right: auto
}

.content {
    width: calc(100% - 8rem);
    margin: 0px;
    /* display: flex; */
    /* align-items: right; */
    font-size: 15px;
}

.content2 {
    /* width: calc(100% - 16rem); */
    margin-left: 12%;
    margin-right: 10%;
    /* display: flex; */
    /* align-items: right; */
    font-size: 15px;
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
    background-color:blanchedalmond;
    margin-bottom: 20px;
    border-radius: 10px;
    border:none;
    padding-top:10px;
    padding-bottom:10px;
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

#special:hover {
    background-color:#90141C;
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
    /* text-align: left; */
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

/* .product-container {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr;
} */

</style>
