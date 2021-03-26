<template> 
    <div >
        <h1>My Profile</h1>
        <h2>Favourite Restaurant</h2>
        <div id="fav">
            <li v-for="item in fav" v-bind:key="item.id">
                <span>{{item}}</span>
                <br><br>
            </li>
            <!-- how to disply picture using a fr loop, now the array fav_img has all element as the weblink-->
            <!--<li v-for="item in fav_img" v-bind:key="item.id"> 
                <img src="item" alt="error" width="200" height="200"></img>
                <br>
            </li>
            -->
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
        <!--I try to use a dummy div and set the height to 700px, to leave a 700px blank, but still cannot make the footer to the bottom -->
        <div id="blank">
            <p> </p>
        </div>
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
            //assume one people can only have one reservation
            reservation_order:{},
            userEmail:""
        }
    },
    methods:{
        fetchItems: function() {
            //alert("here1");
            //alert(this.$userId);
            //database.collection('customers').where("email", "==", this.$userId).get().then(doc =>{
                //retrieve the data from customer janedoe
                //this.customer=doc.data();
                //alert(this.doc());
                //this.reservation=doc.data()['reservation'];
                //this.pickup=doc.data()['pickup'];
                //this.fav=doc.data()['favourites'];
            //}).catch((error) => {
                //alert("Error ");
                //console.log("Error getting documents: ", error);
            //});
            database.collection("customers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    //alert("here2");
                    //alert(doc.data()["email"] == this.$userId);
                    if (doc.data()["email"] == "janedoe@email.com"){
                        //alert("here inside");
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
                        database.collection("reservations").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.data()["restaurant_name"] == this.reservation.restaurant_name){
                                    var idindex=parseInt(this.reservation.id);
                                    this.reservation_order=doc.data().slot.orders[idindex];
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


</style>

