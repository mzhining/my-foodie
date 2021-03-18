<template>
  <div id="app">
    <img id = "pic" src = "./assets/myfoodie-logo.png">
    <app-header></app-header>
    <p> Hello! Just testing this one :) </p>
    <router-view></router-view>
    <app-footer></app-footer>
   </div>
</template>

<script>
//Register Locally
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      title:'My Foodie'
    }
  },
   methods:{
   },
   //Register Locally
  components:{
    'app-header':Header,
    'app-footer':Footer
    
  }

}
</script>

<style>
img {
  height:60px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  text-align: center;
  color: black;
  font-size:14px;
}

</style>
