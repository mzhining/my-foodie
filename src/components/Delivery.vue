<template>
    <div>
        <pre>  </pre>
        <div id="logo">
            <div class="main-bar">
                <h1> {{restaurant_name}} </h1>
                <img :src="image_link" class = "icon"/>  
            </div>

            <div class="side-bar" align="left">
                <p>Restaurant Name:  {{restaurant_name}}</p>
                <p>Adress:  {{restaurant_whole.address}}</p>
                <p>Contact Email:  {{restaurant_whole.contact_email}}</p>
                <p>Contact Number:  {{restaurant_whole.contact_num}}</p>
                <p>Postal Code:  {{restaurant_whole.postal_code}}</p>
                <button v-on:click="addFav()" id="addToFav">Add to favourite</button>
            </div>
        </div>

        <hr id="line">
        <br>
        <div id="container">
            <div id="navigationbar">
                <ul class="naviBar">
                    <li id = "current"><router-link to="/ordertoDelivery" exact><p>Delivery</p></router-link></li>
                    <li><router-link to="/ordertoReservation" exact><p>Reservation</p></router-link></li>
                    <li><router-link to="/ordertoPickup" exact><p>Pick up</p></router-link></li>
                </ul>
            </div>

            <aside id="picture">
                <div class="content" align = "left"> 
                    <div id="menu">
                        <ul id="itemsList">
                            <li v-for="item in menu" v-bind:key="item.name" id="section">
                                
                                <p id="food">{{item.name}}    
                                        <br>${{item.price}}
                                </p> 
                                <img v-bind:src="item.image" id = "menupic"/>  
                                <br> 
                            </li>
                        </ul>
                    </div>
                    <div id="compare">
                        <br>
                        <ul id="price-platform">
                            <li v-for="item in price" v-bind:key="item.name" id="compareli">
                                <pre id="food">Platform: <a v-bind:href="item.web">{{item.name}}</a><br>Delivery Price: ${{item.price}}</pre> 
                            </li>
                        </ul>
                    </div>


                </div>
            </aside>
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
        //alert(this.restaurant_name);
        this.fetchItems();
    },
    methods:{
        addFav:function(){
            var fav=this.$userData["favourites"];
            if (!fav.includes(this.restaurant_name)){
                fav.push(this.restaurant_name);
            }
            database.collection('customers').doc(this.$userUid).update({
                favourites: fav
            }).then(() => {location.reload()});
                
        },
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
body {
    font-family: Inter, sans-serif;
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
}

#price-platform {
    font-family: Inter, sans-serif;
}

#section {
    background-color:white;
    margin-bottom: 20px;
    border-radius: 10px;
    border : 2px solid;
    border-style: solid;
    border-color:#90141C;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    list-style-type: none;
    padding-bottom:10px;
    padding-top:10px;
}

#compareli {
    font-family: Inter, sans-serif;
    font-size: 14pt;
    background-color:blanchedalmond;
    margin-bottom: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    list-style-type: none;
    display: inline-block;
}

img {
    height: 10rem;
}

#menupic {
    height: 5rem;
}

.content {
    width: calc(100% - 8rem);
    margin: auto;
    align-items: left;
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
    border: 1px solid black;
    border-radius: 10px;
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

/* #food {
    font-size:15px;
    font-weight: bold;
    margin-left: 15px;
} */

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

#compare {
    text-align: center;
    font-size:20px;
}

/* #compareli {
    font-family: Inter, sans-serif;
    font-size: 14pt;
    list-style-type: none;
} */

/* #line {
    border: 3px dashed #90141C;
}
img {
    height: 15rem;
    max-width: 100%;
}

#menupic {
    height: 5rem;
}

li {
    flex-grow: 1;
    flex-basis: 100px;
    text-align: center;
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
    margin-bottom: 20px;
    border-radius: 10px;
    list-style-type: none;
}

#food {
    font-size:15px;
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

button {
    background-color: blanchedalmond;
    font-size:15px;
}

.naviBar li {
    list-style-type: none;
    padding: 0;
    text-decoration: none;
    text-align:left;
}

#navigationbar {
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

#current p{
    font-weight: bold;
    background-color: rgba(224, 116, 114, 0.64);
}

.content {
    width: calc(100% - 8rem);
    margin: auto;
    align-items: left;
    font-size: 15px;
} */


</style>