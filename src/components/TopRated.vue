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
            <p id="new"> Top Rated Restaurants </p>
            <br>

             <ul id = "itemsList">
                <li v-for="item in items" v-bind:key="item.name" v-on:click="route()">
                    <img v-bind:src="item.imageURL" class="pic"/>   
                    <br> 
                    <p id = "itemName">{{item.name}} <br> ⭐️ {{item.rating}}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import database from '../firebase.js'

export default {
  name: 'TopRated',
  data () {
    return {
      items : []
    }
  },
  created(){
    this.fetchItems()    
  },
  components : {

  }, 
  
  methods : {
    route:function(){
        this.$router.push({name:'order-to-delivery'});
    },

    fetchItems:function(){
      database.collection('toprated').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.items.push(item) 
         })      
       })    
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
    height: 16rem;
    border-radius:10px;
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

li {
    padding-top:10px;
    padding-bottom:10px;
    padding-right:10px;
    padding-left:10px;
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