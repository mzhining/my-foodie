import Home from './components/Home.vue'
import Delivery from './components/Delivery.vue'
import Reservation from './components/Reservation.vue'
import Pickup from './components/Pickup.vue'

export default [
    { path: '/', component: Home },
    { path: '/delivery', component: Delivery },
    { path: '/reservation', component: Reservation},
    { path: '/pickup', component: Pickup }
]

