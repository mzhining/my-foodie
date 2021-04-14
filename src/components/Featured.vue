<template>
    <section>
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

        <div class="content">
            <p id="new"> Featured Posts from your Favourite Restaurants! </p>
            <br>

            <div id="content">
                <div class="card" v-on:click="route()">
                    <ul id = "itemsList">
                        <li v-for="item in this.items" v-bind:key="item.index" id="picture_display">
                            <img v-bind:src="item.picture" class = "icon"/>  
                            <br> 
                            <p> {{item.caption}} </p>
                        </li>
                    </ul>

                    <!-- <div>
                    <img src="@/assets/jollibee.jpeg" alt="Jollibee" height=15rem>
                    </div>
                    <p>Check out Chicken and Fries set! Now on sale, limited time only! 🔥</p> -->

                </div>

                <br>

                <!-- <div class="card" v-on:click="route()">
                    <div>
                    <img src="@/assets/starbucks.jpeg" alt="Starbucks" height=15rem>
                    </div>
                    <p>Fancy a good quality coffee to get ready for your day? Order now!</p>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
import database from '../firebase.js'
export default {
  name: 'TopRated',
  data () {
    return {
      items : [],
      favourite_rest:[]
    }
  },
  created(){
    this.fetchItems();   
    this.fetchItems2(); 
  },
  components : {

  }, 
  
  methods : {
    route:function(){
        this.$router.push({name:'order-to-delivery'});
    },
    fetchItems:function(){
        database.collection('customers')
        .doc(this.$userUid)
        .get()
        .then((doc) => {
            let storedData = doc.data().favourites;
            this.favourite_rest = storedData;
        }).then(() => console.log(this.favourite_rest));
    },
    fetchItems2:function(){
        database.collection('promotion')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var i;
                    for (i = 0; i < this.favourite_rest.length; i++) {
                        // console.log(this.favourite_rest[i]);
                        // console.log(doc.data().restaurant_name);
                        if (doc.data()["restaurant_name"] == this.favourite_rest[i] && doc.data().posts != '') {
                            this.items.push(doc.data().posts[0])
                            // console.log(doc.data().posts);
                            break;
                        }
                    }
                })
            }).then(() => console.log(this.items));  
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');


#itemsList {
    width: 100%;
    max-width: 100%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
}
  
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

li {
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    padding: 1px;
    /* border: 1px solid #222; */
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
    font-family: 'Pacifico', cursive;
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
</style>