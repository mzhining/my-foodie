<template>
    <div>
        <pre>  </pre>
        <div id="logo">
            <div id="pic">
                <img :src="image_link" alt="Breakfast">
            </div>
            <div id="briefIntro">
                <p>Restaurant Name:  {{restaurant_name}}</p>
                <p>Adress:  {{restaurant_whole.address}}</p>
                <p>Contact Email:  {{restaurant_whole.contact_email}}</p>
                <p>Contact Number:  {{restaurant_whole.contact_num}}</p>
                <p>Postal Code:  {{restaurant_whole.postal_code}}</p>
            </div>
        </div>
        <br>
        <hr id="line">
        <br>
        <div id="container">
            <div id="navigationbar">
                <ul>
                    <li><router-link to="/ordertoDelivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoReservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
            <div id="menu">
                <li v-for="item in menu" v-bind:key="item.name" id="section">
                    <br>
                    <p id="food">Name: {{item.name}}    Price: {{item.price}}</p> 
                    <br> 
                    <hr id="separate">
                </li>
                <div id="compare">
                    <br>
                    <li v-for="item in price" v-bind:key="item.name" id="compareli">
                        <p id="food">Platform {{item.name}}    Delivery Price: {{item.price}}</p> 
                    </li>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data(){
        return{
          restaurant_name:"",
          menu:[],
          updateObj:{},
          //to store the whole document
          restaurant_whole:{},
          image_link:"",
          price:[]
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
                    this.restaurant_whole=doc.data();
                    this.image_link=doc.data()["image"];
                    for (var key of Object.keys(doc.data()["menu"])) {
                        this.menu.push(doc.data()["menu"][key]);
                    }
                }
            });
        });
        database.collection("delivery").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()["restaurant_name"] == this.restaurant_name){
                    this.price=doc.data()["price"];
                }
            });
        });
      }
    }
}
</script>

<style scoped>
#line {
    border: 3px dashed #90141C;
}
img {
    height: 15rem;
}
#logo {
    width: 100%;
    overflow: hidden;
}
#pic {
    margin-left:5%;
    float: left;
    width: 20%;
}
#briefIntro {
    float: left;
    width: 70%;
    text-align: left;
    font-size:20px;
    color:black;
}
#section {
    background-color:rgb(255, 237, 188);
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
ul {
    list-style-type: none;
    padding: 0;
}


#container {
    width: 100%;
    overflow: hidden;
}
#navigationbar {
    font-size:30px;
    margin-left:5%;
    float: left;
    width: 15%;
    text-align: left;
}
#menu {
    float: left;
    width: 80%;
}

#compare {
    text-align: left;
    margin-left:10%;
    font-size:20px;
}
#compareli {
    list-style-type: none;
    font-family: "Times New Roman", Times, serif;
}

</style>