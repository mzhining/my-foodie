<template>
<div id="page-container">
   <div id="content-wrap">
     <!-- all other page content -->
   </div>
   <footer id="footer">
      <p v-html="copyRtSymbol"></p>   
   </footer>
 </div>

</template>

<script>
export default {
  
  data(){
    return{
        
        copyRtSymbol:'&copy;2021 My Foodie. All rights reserved.'
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;   
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  background: #90141C;
}


/* #footer{
    display: flex;
    justify-content: center;
    align-items: center; 
    bottom: 0px;
    margin-bottom: 0px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;  
    left: 0px;
    flex-shrink: 0;
} */

p{
    align-content: center;
    color:ivory;
    font-size:15px;
}
</style>