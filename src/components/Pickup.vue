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
                        <p> Choose your order </p>
                        <br>
                        
                        <li v-for="item in this.datapacket.menu" v-bind:key="item.name" id="section">
                        <br>
                        <p id="food">Name: {{item.name}}    
                            <br> Price: ${{item.price}}
                            </p> 
                            <img v-bind:src="item.image" id = "menupic"/>  
                            <QuantityCounter v-bind:item="item" v-on:counter="onCounter"> </QuantityCounter> 
                        <br> 
                        <hr id="separate">
                        </li>

                        <button v-on:click="findTotal()"> Calculate Total </button>

                        <p> Total price: ${{this.subTotal}}</p>
                        <br>
                    </div>
                </div>
                <div class = "bottom" align = "center">
                    <br>
                    <br>
                    <button v-on:click="sendOrder()"> Order! </button>
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

export default {
    name : 'Pickup',
    data(){
        return{
            subTotal : 0, 
            orderList : [],
            datapacket: [],
            rname:'Jollibee',
            itemsSelected:[],
            oneOrder : []
        }
    },
    props : {
      id : {
          type : String
      }
    },
    components : {
        QuantityCounter
    },
    created:function(){
        this.fetchItems();
    },
    methods:{
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
        }, 
        findTotal : function() {
            var total = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
            total += (this.itemsSelected[i][1] * this.itemsSelected[i][2]);
            }
            this.subTotal = total.toFixed(2); 
        },
        sendOrder : function() {
            this.getOrder();
            console.log(this.orderList);
            database.collection('pickup')
            .doc(this.rname)
            .update({orders : this.orderList })
            .then(()=>{this.$router.push({ name: 'pickup-payment', params : {total : this.subTotal}})});
        },

        getOrder : function() {
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.oneOrder.push({
                    name : this.itemsSelected[i][0], 
                    count : this.itemsSelected[i][1], 
                    price : this.itemsSelected[i][2]
                })
            }
            this.orderList.push({
                email : this.$userId, 
                one_order : this.oneOrder, 
                total : this.subTotal
            })
            },

            onCounter: function (item, count) {
                var doneAction = false; 
                if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                    console.log(this.itemsSelected[0]);
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
                            console.log(this.itemsSelected[0]);
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
    /* margin-left: 10%;
    margin-right: 10%; */
    border-radius: 10px;
    list-style-type: none;
}

</style>
