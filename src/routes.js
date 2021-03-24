import Home from './components/Home.vue'
// import Delivery from './components/Delivery.vue'
import Reservation from './components/Reservation.vue'
// import Pickup from './components/Pickup.vue'
import CustSignup from './components/CustSignup.vue'
import RestSignup from './components/RestSignup.vue'
import SignupSuccess from './components/SignupSuccess.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default [
    { path: '/', component: Home },
    // { path: '/delivery', component: Delivery },
    { path: '/reservation', component: Reservation},
    // { path: '/pickup', component: Pickup }
    { path: '/signup-cust', component: CustSignup},
    { path: '/signup-rest', component: RestSignup},
    { path: '/signup-success', component: SignupSuccess},
    { path: '/login', component: Login},
    { path: '/register', component: Register},
]

/* <router-link to="/" exact>Home</router-link>
        <router-link to="/delivery" exact>Top Rated </router-link>
        <router-link to="/featured" exact>Featured</router-link>
        <router-link to="/order" exact>Order</router-link>
        <router-link to="/account" exact>My Account</router-link> */

//note to self: when the pages are done, need to put the router link to the path 

