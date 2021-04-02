<template>
    <div>
        <p id="test"></p>
        <p>Menu:</p>
        <ul id="list">
            <li id="list" v-for="item in itemsSelected" v-bind:key="item.id">
                <p>{{item[0]}} x {{item[1]}} </p>
            </li>
        </ul>
        <br>
        <button @click="findTotal"> Calculate Total </button>
        <br>
        <p v-show="show"> Subtotal: ${{subtotal}} <br> Grand Total: ${{grandtotal}} </p>
        <br><br>
        <button v-on:click="sendOrder"> Add Order </button>
    </div>
</template>

<script>
    import database from '../firebase.js'

    export default {
        props: {
            itemsSelected: {
                type: Array
            },
            data: {
                type: Object
            },
            doc_id: {
                type: String
            },
            slotNumber: {
                type: Number
            }
        },
        data() {
            return {
                subtotal: 0,
                show: false
            }
        },
        computed: {
            grandtotal: function() {
                var rounding = this.subtotal * 1.07;
                return rounding.toFixed(2);
            }
        },
        methods: {
            findTotal() {
                this.show = true;
                var sub = 0;
                for (var i = 0; i < this.itemsSelected.length; i++) {
                    sub += this.itemsSelected[i][2] * this.itemsSelected[i][1];
                }
                this.subtotal = sub;
            },
            sendOrder() {
                let newOrder = new Map()
                this.itemsSelected.forEach((item) => {
                    newOrder[item[0]] = item[1];
                });
                this.data.slots[this.slotNumber].orders[-1] = newOrder;
                //add order to database
                database.collection('reservations').doc(this.doc_id).update(this.data);
            }
        }
    }
</script>

<style>

</style>
