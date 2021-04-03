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
        <hr id="line">
        <div id="container">
            <div id="navigationbar">
                <ul id="naviBar">
                    <li><router-link to="/ordertoDelivery" exact>Delivery </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoReservation" exact>Reservation </router-link></li>
                    <br><br>
                    <li><router-link to="/ordertoPickup" exact>Pick up </router-link></li>
                </ul>
            </div>
            <aside id="picture">
                <div class="content">
                    <ul id = "itemsList">
                        <li v-for="item in restaurants" v-bind:key="item.restaurant_name" id="picture_display" v-on:click="route($event)">
                            <!--first direct them to delivery page -->
                            <img v-bind:src="item.image" class = "icon"/>  
                            <br> 
                            <p v-bind:id="item.restaurant_name" >{{item.restaurant_name}} </p>
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
        route:function(event){
            let restName = event.target.getAttribute("id");
            this.$router.push({name:'pickup', params:{rname:restName}});
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

#picture_display {
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 30px;
    background-color:rgb(255, 237, 188);
    margin-bottom: 20px;
    border-radius: 10px;
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

#icon {
    height: 15rem;
    weight: 15rem;
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
    font-size:20px;
    margin-left:5%;
    float: left;
    width: 10%;

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
    background-color:#90141C;
    color:white;
}

</style>

