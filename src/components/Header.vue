<template>
   <div>
    <header>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/toprated" exact>Top Rated </router-link>
        <router-link to="/featured" exact>Featured</router-link>
        <router-link to="/order" exact>Order</router-link>
        <router-link to="/account" exact>My Account</router-link>
        <router-link to="/reservation" exact>Reservation (added router just to check page)</router-link>
    </header>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: 'My Foodie'
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #90141C;
    font-size:25px;
}
h1{
    color:ivory
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
/*when the router is pressed*/
.router-link-active{
    background: #eee;
    color: #444;
}
</style>