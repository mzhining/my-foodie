<template> 
    <div >
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
        <h1>My Profile</h1>
        <h2>Favourite Restaurant</h2>
        <div id="fav">
            <li v-for="item in fav" v-bind:key="item.id" class="box">
                <span>{{item}}</span>
            </li>
            <br><br>
            <!-- how to disply picture using a fr loop, now the array fav_img has all element as the weblink-->
            <li v-for="item in fav_img" v-bind:key="item.id" class="box"> 
                <img v-bind:src="item" alt="error"/> 
                <span>     </span>
            </li>
        </div>
        <h2>Current Order</h2>
        <div class="section">
            <p id="header">{{orders.restaurant}} -- {{orders.type}}</p>
            <li v-for="item in orders.orders" v-bind:key="item.id" id="itemlist">
                <span>{{item.qty}}x {{item.item}}</span>
                <br>
            </li>
            <br><br>
        </div>
        <h2>Reservation</h2>
        <div class="section">
            <p id="header">{{reservation.restaurant_name}} -- reservation</p>
            <div id="block" v-for="(key, value) in reservation_order" v-bind:key="key">
                {{key}}x {{value}}  <br>
            </div>
            <br><br>
        </div>
        <!--I try to use a dummy div and set the height to 700px, 
        to leave a 700px blank, but still cannot make the footer to the bottom -->
        <div id="blank">
            <p> </p>
        </div>
        <router-link to="/accountR" exact>Go to DashboardR </router-link>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    data() {
        return {
            orders: {},
            fav:[],
            fav_img:[],
            fav_html:[],
            customer:{},
            reservation:{},
            ///////////////////////////////////////////////////
            //use the document janedoe as sample display!!!!
            //assume one people can only have one reservation, since the reservation in customer document is a map rather than an array
            //and other document in customers does not have reservation feild.
            //For pickup, it is stored in cart attribute in the document
            reservation_order:{},
            userEmail:""
        }
    },
    methods:{
        fetchItems: function() {
            //database.collection('customers').where("email", "==", this.$userId).get().then(doc =>{
                //this.customer=doc.data();
                //this.reservation=doc.data()['reservation'];
                //this.pickup=doc.data()['pickup'];
                //this.fav=doc.data()['favourites'];
            //}).catch((error) => {
                //alert("Error ");
                //console.log("Error getting documents: ", error);
            //});
            database.collection("customers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    ///////////////////////////////////////////////////////////////////////
                    //doc.data()["email"] == this.$userId :
                    //here I use janedoe customer as example, but actually it should be a global variable!
                    if (doc.data()["email"] == "janedoe@email.com"){
                        this.customer=doc.data();
                        this.fav=doc.data()['favourites'];
                        this.orders=doc.data()['cart'];
                        this.reservation=doc.data()['reservation'];
                        for (let i = 0; i < this.fav.length; i++) {
                            database.collection("restaurants").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (doc.data()["restaurant_name"] == this.fav[i]){
                                        this.fav_img.push(doc.data()["image"]);
                                        //alert(this.fav_img);
                                        //var img = document.createElement('img');
                                        //img.src = linkInfo.img;
                                    }
                                }); 
                            });
                        }
                        ///////////////////////////////////////////////
                        //to get the reservations of this customer
                        database.collection("reservations").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.data()["restaurant_name"] == this.reservation.restaurant_name){
                                    var idindex=parseInt(this.reservation.id);
                                    /////////////////////////////////////////////////////////////////////////////
                                    //assume that it only retrieve from slots[0], so we need 2 index to decide which reservation the customer has
                                    this.reservation_order=doc.data().slots[0].orders[idindex];
                                }
                            }); 
                        });
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

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

#pic {
    height: 17rem;
    position: absolute;
    z-index: 69;
    right: 8%;
    top: 8%;
    height: 15rem;
}
#line {
    border: 3px dashed #90141C;
}

h1 {
  font-size:30px;
  color:black;
  margin-left: 10%;
  font-weight: bold;
  text-align: left;
}
h2 {
  font-size:20px;
  color:black;
  margin-left: 10%;
  text-align: left;
}

#fav {
    font-size:15px;
    list-style-type: none;
    text-align: left;
    margin-left: 10%;

}

#header {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    font-weight: bold;
    margin-left: 2%;
}

#itemlist {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}

.section {
    background-color:rgb(198, 204, 204);
    margin-left: 10%;
    margin-right: 10%;
    border-radius: 10px;
}
#block {
    font-size:20px;
    list-style-type: none;
    text-align: left;
    margin-left: 2%;
}
.blank {
    height:700px;
}
.box { 
    display: inline; 
    margin-left: 5px;
    margin-right: 5px;
}

</style>

