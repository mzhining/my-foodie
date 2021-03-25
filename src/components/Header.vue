<template>
   <div>
    <header>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/toprated" exact>Top Rated </router-link>
        <router-link to="/featured" exact>Featured</router-link>
        <router-link to="/order" exact>Order</router-link>
        <router-link to="/account" exact>My Account</router-link>
        <router-link to="/reservation" exact>Reservation (added router just to check page)</router-link>
        <router-link to="/login" exact>Login</router-link>
        <router-link to="/register" exact>Register</router-link>
        <button v-on:click.prevent="logout()">Logout</button>
    </header>
    </div>
  
</template>

<script>
import firebase from 'firebase';

export default {
  
  data(){
    return{
        msg: 'My Foodie',
        isLoggedIn: false,
        currentUser: false
    }
  },
  methods: {
      logout: function() {
          firebase.auth().signOut().then(() => {
              this.$router.push('/login');
          })
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
    font-size:15px;
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