<template> 
    <div >
        <h1>Restaurant Overview</h1>
        <h2>My current order</h2>
        <div class="section">
        </div>
        <h2>Today's reservation</h2>
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
            restaurant :{}
        }
    },
    methods:{
//        fetchItems: function() {
//            database.collection('restaurants').doc('starbucks').get().then(doc =>{
//                //retrieve the data from resturant starbucks
//                this.restaurant=doc.data();
//                this.reservation=doc.data()['reservation'];
//                this.pickup=doc.data()['pickup'];
//           });
//        }
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

