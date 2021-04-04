<template>
    <div>
        <p> Ordering for your reservation for {{this.$route.params.pax}} pax at {{this.$route.params.time}} on {{this.$route.params.date}} at {{this.$route.params.id}} at {{this.$route.params.postal}}. </p>
        <ul id="itemsList">
            <li v-for="item in items" v-bind:key="item.id">
                <p id="itemName">{{item.name}}</p>
                <img v-bind:src="item.itemImage"/>
                <p id="price">${{item.price}}</p>
                <QuantityCounter v-on:counter="onCounter" v-bind:item = "item"></QuantityCounter>
            </li>
        </ul>
        <p>Menu:</p>
        <ul id="list">
            <li id="list" v-for="item in itemsSelected" v-bind:key="item.id">
                <p>{{item[0]}} x {{item[1]}} </p>
            </li>
        </ul>
        <br>
        <br>
        <p> Total: ${{total}}</p>
        <br><br>
        <button v-on:click="sendOrder"> Send Order </button>
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
                show: false
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
                });
                this.data.slots[this.slotNumber]["orders"][this.$route.params.orderNumber] = newOrder;
                //add order to database
                database.collection('reservations').doc(this.doc_id).update(this.data).then(this.$router.push({ name: 'reservationPayment', params: {id: this.$route.params.id, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal, data: this.data, slotNumber: this.$route.params.slotNumber, orderNumber: this.$route.params.orderNumber, total: this.total}}));
                console.log("Order sent!");
            },
            fetchItems: function() {
                this.data = this.$route.params.data;
                this.doc_id = this.$route.params.id;
                this.slotNumber = this.$route.params.slotNumber;
                database.collection('restaurants').get().then(querySnapshot => {
                    let item={};
                    querySnapshot.docs.forEach(doc => {
                        if (doc.id == this.$route.params.id) {
                            item=doc.data();
                            item.show=false;
                            this.items = item["menu"];
                        }
                    });
                });
            }
        },
//        computed: {
//           grandtotal: function() {
//                var rounding = this.subtotal * 1.07;
//                return rounding.toFixed(2);
//            }
//        },
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
</style>