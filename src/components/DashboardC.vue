<template> 
    <div >
        <h1>My Profile</h1>
        <h2>Favourite Restaurant</h2>
        <div class="section">
        </div>
        <h2>Current Order</h2>
        <div class="section">
        </div>
        
    </div>
</template>

<script>
//import database from "../firebase.js"

export default {
    data() {
        return {
            pickup: [],
            reservation:[],
            fav:[],
            customer:{}

        }
    },
    methods:{
//        fetchItems: function() {
//            database.collection('customers').doc('janedoe').get().then(doc =>{
//                //retrieve the data from customer janedoe
//                this.customer=doc.data();
//                this.reservation=doc.data()['reservation'];
//                this.pickup=doc.data()['pickup'];
//                this.fav=doc.data()['favourites'];
//            });
//      }
    },
    created:function(){
        this.fetchItems();
    }
}

</script>

<style scoped>
h1 {
  font-size:30px;
  color:black;
  margin-left: 30px;
  font-weight: bold;
}
h2 {
  font-size:20px;
  color:black;
  margin-left: 40px;
}


</style>

