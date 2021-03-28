<template>
   <footer id="footer">

        <router-link to="/aboutus" exact>ABOUT US</router-link>
        <router-link to="/privacypolicy" exact>PRIVACY POLICY</router-link>
        <router-link to="/contactus" exact>CONTACT US</router-link>

      <br>
      <br>
      <p>&copy; 2021 MyFoodie. All rights reserved.</p>   
   </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

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
/* .router-link-active{
    background: #eee;
    color: #444;
} */

#footer {
  background: #90141C;
  padding: 2rem 0;
}

#footer p {
  color: white;
  margin: 0;
  font-family: Nunito, sans-serif;
}
</style>