<template>
    <div>
        <p> Delivery page</p>
        <li v-for="item in menu" v-bind:key="item.name" id="section">
            <br>
            <p id="food">Name: {{item.name}}    Price: {{item.price}}</p> 
            <br> 
        </li>
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data(){
        return{
          restaurant_name:"",
          menu:[],
          updateObj:{}
        }
    },
    created:function(){
        this.restaurant_name=this.$route.params.restaurantN;
        alert(this.restaurant_name);
        this.fetchItems();
    },
    methods:{
      fetchItems:function(){
        database.collection("restaurants").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()["restaurant_name"] == this.restaurant_name){
                    for (var key of Object.keys(doc.data()["menu"])) {
                        this.menu.push(doc.data()["menu"][key]);
                    }
                }
            });
        });
      }
    }
}
</script>

<style scoped>
#section {
    background-color:rgb(198, 204, 204);
    margin-left: 10%;
    margin-right: 10%;
    border-radius: 10px;
    list-style-type: none;
}
#food {
    
    font-size:30px;
    font-weight: bold;
    margin-left: 15px;
}
</style>