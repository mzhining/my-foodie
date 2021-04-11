<template>
   <div>
    <header>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/toprated" exact>Top Rated </router-link></li>
            <li><router-link to="/featured" exact>Featured</router-link></li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Order</a>
                <div class = "dropdown-content">
                    <router-link to="/ordertoDelivery" exact>Delivery</router-link>
                    <router-link to="/ordertoReservation" exact>Reservation</router-link>
                    <router-link to="/ordertoPickup" exact>Pickup</router-link>
                </div>
            </li>
            <li><router-link to="/account" exact>My Account</router-link></li>
            <li><router-link to="/login" exact>Login</router-link></li>
            <li><router-link to="/register" exact>Register</router-link></li>
            <li><button v-on:click.prevent="logout()">Logout</button></li>
        </ul>
    </header>
    </div>

<!-- 
<li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </li> -->


</template>

<script>
import firebase from 'firebase';

export default {
  
  data(){
    return{
        msg: 'My Foodie',
        // isLoggedIn: false,
        // currentUser: false
    }
  },
  methods: {
      logout: function() {
          if (firebase.auth().currentUser) {
              firebase.auth().signOut().then(() => {
                  this.$router.replace('/login');
                  alert('Successfully logged out');
                // this.$router.go({path: this.$router.path});
              })
              .catch((error) => alert(error.message))
          } else {
              alert('ERROR: Not logged in!');
          }
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

/*when the router is pressed*/
.router-link-active{
    background: white;
    color: black;
    border-radius:10px;
    font-weight: bold;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 100;
  border-radius:10px;
}

.dropdown-content a {
  color: black;
  padding: 5px 5px;
  text-decoration: none;
  display: block;
  text-align: left;
  border-radius:10px;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
  border-radius:10px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 70%;
  align-content: center;
}

li {
  float: left;
}

li a, .dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;  
  text-decoration: none;
  margin:0px;
}

li a:hover, .dropdown:hover .dropbtn {
  background-color: white;
  color: black;
  border-radius:8px;
}

li.dropdown {
  display: inline-block;
}

button {
    margin-top:10px;
    cursor: pointer;
    background: white;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    padding: 5px 15px;
    border-radius: 10px;
    border: none;
}

button:hover {
    background: #EBA4A4;
    color:white;
}


</style>