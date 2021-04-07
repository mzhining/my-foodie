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
        <div>
            <div id="navigationbar">
                <ul>
                    <li><router-link to="/ordertoDelivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoReservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
            <div>
                <p> Ordering for your reservation for {{this.$route.params.pax}} pax at {{this.$route.params.time}} on {{this.$route.params.date}} at {{this.$route.params.name}} at {{this.$route.params.postal}}. </p>
                <ul id="menu">
                    <li v-for="item in items" v-bind:key="item.id" id="menu">
                        <p id="itemName">{{item.name}}</p>
                        <br>
                        <p id="price">${{item.price}}</p>
                        <img v-bind:src="item.image"/>
                        <QuantityCounter v-on:counter="onCounter" v-bind:item = "item"></QuantityCounter>
                    </li>
                </ul>
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
                <button class="special" v-on:click="sendOrder"> Send Order </button>
            </div>
        </div>
    </div>
</template>

<script>
    import QuantityCounter from './QuantityCounter'
    import database from '../firebase.js'

    export default {
        data() {
            return {
                itemsSelected: [],
                items: [],
                data: {},
                doc_id: "",
                total: 0,
                show: false,
                datapacket: [],
                rdoc_id: ""
            }
        },
        components: {
            QuantityCounter
        },
        methods: {
            onCounter: function (item, count) {
                var updated = false;
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                    updated = true;
                } else {
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];
                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if (item_name === item.name && count > 0) {
                            var a1 = this.itemsSelected.slice(0,i);
                            a1.push([item.name, count, item.price]);
                            var a2 = this.itemsSelected.slice(i+1);
                            this.itemsSelected = a1.concat(a2);
                            updated = true;
                        }
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        else if (item_name === item.name && count === 0) {
                            var b1 = this.itemsSelected.slice(0,i);
                            var b2 = this.itemsSelected.slice(i+1)
                            this.itemsSelected = b1.concat(b2);
                            updated = true;
                        }
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    if (!updated && count > 0) {
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            },
//            findTotal: function() {
//                this.show = true;
//                var sub = 0;
//                for (var i = 0; i < this.itemsSelected.length; i++) {
//                    sub += this.itemsSelected[i][2] * this.itemsSelected[i][1];
//                }
//                this.subtotal = sub;
//            },
            sendOrder: function() {
                let newOrder = {};
                this.itemsSelected.forEach((item) => {
                    newOrder[item[0]] = item[1];
                    this.datapacket["order_counts"][item[0]] += item[1];
                });
                this.data.slots[this.slotNumber]["orders"][this.$route.params.orderNumber] = newOrder;
                //add order to database
                database.collection('restaurants').doc(this.rdoc_id).update(this.datapacket);
                database.collection('reservations').doc(this.doc_id).update(this.data).then(this.$router.push({ name: 'reservationPayment', params: {name: this.$route.params.name, id: this.$route.params.id, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal, data: this.data, slotNumber: this.$route.params.slotNumber, orderNumber: this.$route.params.orderNumber, total: this.total, itemsSelected: this.itemsSelected}}));
                console.log("Order sent!");
            },
            fetchItems: function() {
                database.collection('restaurants')
                .get()
                .then(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        if (doc.data().restaurant_name == this.$route.params.name) {
                            var datap = doc.data();
                            this.datapacket = datap;
                            this.rdoc_id = doc.id;
                        }
                    });
                });
                this.data = this.$route.params.data;
                this.doc_id = this.$route.params.id;
                this.slotNumber = this.$route.params.slotNumber;
                database.collection('restaurants').get().then(querySnapshot => {
                    let item={};
                    querySnapshot.docs.forEach(doc => {
                        if (doc.data().restaurant_name == this.$route.params.name) {
                            item=doc.data();
                            item.show=false;
                            this.items = item["menu"];
                        }
                    });
                });
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
            this.fetchItems();
        }
    }
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

.special {
    background-color: pink; 
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    display:inline-block;
    padding:8px;
}
#basket {
    margin-left: 12%;
}
#display {
    display: list-item;
}
</style>