<template> 
    <div >
        <h1>Restaurant Overview</h1>
        <h2>My current order</h2>
        <div class="section">
        </div>
        <h2>Today's reservation</h2>
        <!-- Assume reservations is one document one resaturant? -->
        <div class="section">
            <div id="name">

            </div>
            <aside id="NoPax">

            </aside>
            <aside id="Time">

            </aside>
            <aside id="order">

            </aside>
        </div>
        
    </div>
</template>

<script>
import database from "../firebase.js"
//use Jollibee as an example!
export default {
    data() {
        return {
            pickup: [],
            reservation:[],
            restaurant :{},
            name:[],

        }
    },
    methods:{
        fetchItems: function() {
            database.collection("reservations").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => { 
                    if (doc.data()["restaurant_name"] == "Jollibee"){

                    }
                }); 
            });
        }
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

