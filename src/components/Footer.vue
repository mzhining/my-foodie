<template>
  <div class="footer">
    <footer>
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
footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #90141C;
}
p{
    align-content: center;
    color:ivory;
    font-size:25px;
}
</style>