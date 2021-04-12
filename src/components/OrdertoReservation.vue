<template> 
    <div>
        <div class="kotak-mereng">
            <div class="penyot">
                <div class="rectangle" />
                <div class="segitiga" />
            </div>
            
            <div class="kotak-mereng-content">
                <img id="pic" src="@/assets/breakfast.jpg" alt="Breakfast">
                <p id="slogan">One Stop Place for Your Stomach! </p>
            </div>
        </div>
        <label>Search: </label>
        <input type="text" v-model="context" />
        <button id="submit" v-on:click="search">submit</button>
        <br>
        <hr id="line">
        <div id="container">
            <div id="navigationbar">
                <ul class="naviBar">
                    <li><router-link to="/ordertoDelivery" exact><p>Delivery</p></router-link></li>
                    <li id = "current"><router-link to="/ordertoReservation" exact><p>Reservation</p></router-link></li>
                    <li><router-link to="/ordertoPickup" exact><p>Pick up</p></router-link></li>
                </ul>
            </div>
            <aside id="picture">
                <div class="content">
                    <ul id = "itemsList">
                        <li v-for="item in restaurants" v-bind:key="item.restaurant_name" id="picture_display">
                            <!--first direct them to delivery page -->
                            <img v-bind:src="item.image" class = "icon"/>  
                            <br> 
                            <p v-bind:id="item.restaurant_name" v-bind:postal="item.postal_code" v-on:click="route($event)">{{item.restaurant_name}} </p>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            restaurants:[],//to store the whole object
            image:[]
        }
    },
    methods:{
        search:function(){
            if (this.context==""){
                this.restaurants=[];
                database.collection("restaurants").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.restaurants.push(doc.data());
                        this.image.push(doc.data()["image"]);
                    });
                });
            }
            if (this.context!=""){
                this.restaurants=[];
                database.collection("restaurants").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if(doc.data()["restaurant_name"].indexOf(this.context) !== -1){
                            this.restaurants.push(doc.data());
                            this.image.push(doc.data()["image"]);
                        }
                    });
                });
            }
        },
        route:function(event){
            let restaurant_name = event.target.getAttribute("id");
            let postal_code=event.target.getAttribute("postal");
            this.$router.push({name:'reservation', params:{name:restaurant_name, postal: postal_code}});
            //I set this name as pickup!!
        },
        fetchItems: function() {
            database.collection("restaurants").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.restaurants.push(doc.data());
                    this.image.push(doc.data()["image"]);
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.icon {
    object-fit: cover;
    border-radius: 8px;
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
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

#picture_display {
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 30px;
    background-color:white;
    margin-bottom: 20px;
    border-radius: 10px;
    border : 2px solid;
    border-style: solid;
    border-color:#90141C;
}

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.kotak-mereng {
    position: relative;
    height: 20rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.kotak-mereng-content {
    max-width: 1300px;
    position: relative;
    width: 100%;
}

.rectangle{
    height: 5rem;
    background-color: rgba(224, 116, 114, 0.64);
}

.segitiga {
    overflow: hidden;
    height: 0;
    border-width: 10rem 100vw 0 0;
    border-style: solid;
    border-color: rgba(224, 116, 114, 0.64) transparent transparent rgba(224, 116, 114, 0.64);
}

#current p{
    font-weight: bold;
    background-color: rgba(224, 116, 114, 0.64);
}

.penyot {
    position: absolute;
    overflow: hidden;
    top: 0;
    width: 100%;
    z-index: 0;
}

#slogan {
    font-family: 'Pacifico', cursive;
    font-size: 40px;
    color: white;
    margin: 0;
    position: absolute;
    z-index: 69;
    left: 10%;
    top: 30%;
}

.icon {
    object-fit: cover;
    border-radius: 8px;
}

#pic {
    height: 17rem;
    position: absolute;
    z-index: 69;
    right: 8%;
    top: 8%;
}

ul{
    text-decoration: none;
}

#line {
    border: 3px dashed #90141C;
}

#new {
    font-family: Nunito;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
    text-align: left;
    width: 100%;
}

.content {
    width: calc(100% - 8rem);
    max-width: 1000px;
    margin: auto;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
}

.card {
    padding: 1rem;
}

.card div {
    height: 15rem;
    width: 40rem;
    border-radius: 1rem;
}

.card p {
    font-family: Inter, sans-serif;
    font-size: 14pt;
    margin: 1rem 0 0 0;
}
#container {
    width: 100%;
    overflow: hidden;
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

#picture {
    float: left;
    width: 80%;
}
.content p:hover {
    background-color:#90141C;
    color:white;
}

li {
    list-style-type: none;
    padding: 0;
    text-decoration: none;
    text-align:left;
}
button {
    background-color: rgba(224, 116, 114, 0.64);
}
label {
    margin-right:10px;
}
input {
    margin-right:10px;
}
/* #itemsList {
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

#picture_display {
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    padding: 1px;
    margin: 2px;
}

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.kotak-mereng {
    position: relative;
    height: 20rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.kotak-mereng-content {
    max-width: 1300px;
    position: relative;
    width: 100%;
}

.rectangle{
    height: 5rem;
    background-color: rgba(224, 116, 114, 0.64);
}

.segitiga {
    overflow: hidden;
    height: 0;
    border-width: 10rem 100vw 0 0;
    border-style: solid;
    border-color: rgba(224, 116, 114, 0.64) transparent transparent rgba(224, 116, 114, 0.64);
}

.penyot {
    position: absolute;
    overflow: hidden;
    top: 0;
    width: 100%;
    z-index: 0;
}

#slogan {
    font-family: Carosello;
    font-size: 40px;
    color: white;
    margin: 0;
    position: absolute;
    z-index: 69;
    left: 10%;
    top: 30%;
}

img {
    height: 15rem;
    max-width: 100%;
}

#pic {
    height: 17rem;
    position: absolute;
    z-index: 69;
    right: 8%;
    top: 8%;
}

#line {
    border: 3px dashed #90141C;
}

#new {
    font-family: Nunito;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
    text-align: left;
    width: 100%;
}

.content {
    width: calc(100% - 8rem);
    max-width: 1000px;
    margin: auto;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
}

.card {
    padding: 1rem;
}

.card div {
    height: 15rem;
    width: 40rem;
    border-radius: 1rem;
}

.card p {
    font-family: Inter, sans-serif;
    font-size: 14pt;
    margin: 1rem 0 0 0;
}
#container {
    width: 100%;
    overflow: hidden;
}
#navigationbar {
    text-align: left;
    font-size:30px;
    margin-left:5%;
    float: left;
    width: 15%;

}
#naviBar {
    list-style-type: none;
    padding: 0;
}
#picture {
    float: left;
    width: 80%;
}
.content p:hover {
    color: blue;
} */

</style>

