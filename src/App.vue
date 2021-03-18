<template>
  <div id="app">
    <app-header></app-header>
    <h1> Hello! Just testing this one :) </h1>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  text-align: center;
  color: black;
}

</style>
