import Home from './components/Home.vue'
// import Delivery from './components/Delivery.vue'
import Reservation from './components/Reservation.vue'
// import Pickup from './components/Pickup.vue'

export default [
    { path: '/', component: Home },
    // { path: '/delivery', component: Delivery },
    { path: '/reservation', component: Reservation}
    // { path: '/pickup', component: Pickup }

]

/* <router-link to="/" exact>Home</router-link>
        <router-link to="/delivery" exact>Top Rated </router-link>
        <router-link to="/featured" exact>Featured</router-link>
        <router-link to="/order" exact>Order</router-link>
        <router-link to="/account" exact>My Account</router-link> */

//note to self: when the pages are done, need to put the router link to the path 

