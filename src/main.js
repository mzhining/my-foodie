import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Routes from './routes.js'
import firebase from 'firebase';

// from file: routes.js
import Home from './components/Home.vue'
// import Delivery from './components/Delivery.vue'
import Reservation from './components/Reservation.vue'
import ReservationConfirmed from './components/ReservationConfirmed'
import ReservationOrder from './components/ReservationOrder'
import ReservationPayment from './components/ReservationPayment'
import ReservationComplete from './components/ReservationComplete'
// import Pickup from './components/Pickup.vue'



import CustSignup from './components/CustSignup.vue'
import RestSignup from './components/RestSignup.vue'
import SignupSuccess from './components/SignupSuccess.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import TopRated from './components/TopRated.vue'
import Featured from './components/Featured.vue'
import ContactUs from './components/ContactUs.vue'
import Pickup from './components/Pickup.vue'
import PickupConfirmation from './components/PickupConfirmation.vue'
import PickupPayment from './components/PickupPayment.vue'
// end of import from routes.js

import Dashboard from './components/Dashboard.vue';
//import DashboardC from './components/DashboardC.vue';
//import DashboardR from './components/DashboardR.vue';
import Delivery from './components/Delivery.vue';
import OrdertoDelivery from './components/OrdertoDelivery.vue';
import OrdertoPickup from './components/OrdertoPickup.vue';
import OrdertoReservation from './components/OrdertoReservation.vue';
import Settings from './components/Settings.vue';
import loadData from './loadData.js';

Vue.config.productionTip = false
Vue.use(VueRouter)
//global variable that can be accessed by every component!
// Vue.prototype.$userId = 'jamesbond@gmail.com'
Vue.mixin(loadData)


const myRouter = new VueRouter({
// let myRouter = new VueRouter({
  routes: [
    { path: '/', component: Home, name : 'home'},
    { path: '/toprated', component: TopRated },
    { path: '/featured', component: Featured },
    { path: '/contactus', component: ContactUs },
    { path: '/pickup-payment', component: PickupPayment, name : 'pickup-payment', props : true },
    { path: '/reservation', component: Reservation, meta: {requiresAuth: true}},
    { path: '/signup-cust', component: CustSignup, meta: {requiresGuest: true}},
    { path: '/pickup-confirmation', component: PickupConfirmation, name : 'pickup-confirmation', props : true},
    { path: '/signup-rest', component: RestSignup, meta: {requiresGuest: true}},
    { path: '/signup-success', component: SignupSuccess, meta: {requiresGuest: true}},
    { path: '/login', name: 'login', component: Login, meta: {requiresGuest: true}},
    { path: '/register', name: 'register', component: Register, meta: {requiresGuest: true}},
    { path: '/account', component: Dashboard, name : 'account', meta: {requiresAuth: true}},
    //{ path: '/accountR', component: DashboardR, meta: {requiresAuth: true}},
    { name:'delivery', path: '/delivery', component: Delivery, props:true, meta: {requiresAuth: true}},
    { name:'reservation', path: '/reservation', component: Reservation, props:true, meta: {requiresAuth: true}},
    { name:'reservationConfirmed', path: '/reservationConfirmed', component: ReservationConfirmed, props:true, meta: {requiresAuth: true}},
    { name:'reservationOrder', path: '/reservationOrder', component: ReservationOrder, props:true, meta: {requiresAuth: true}},
    { name:'reservationPayment', path: '/reservationPayment', component: ReservationPayment, props:true, meta: {requiresAuth: true}},
    { name:'reservationComplete', path: '/reservationComplete', component: ReservationComplete, props:true, meta: {requiresAuth: true}},
    { name:'pickup', path: '/pickup', component: Pickup, props:true, meta: {requiresAuth: true}},
    { path: '/ordertoDelivery', component: OrdertoDelivery, name : 'order-to-delivery', meta: {requiresAuth: true}},
    { path: '/ordertoPickup', component: OrdertoPickup},
    { path: '/ordertoReservation', component: OrdertoReservation, meta: {requiresAuth: true}},
    { path: '/settings', component: Settings, meta: {requiresAuth: true}}

  ],
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter,
}).$mount('#app')

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Navigation Guards (draft)
// myRouter.beforeEach((to, from, next) => {
//   // this route requires auth, check if logged in
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // check if not logged in
//     if (!firebase.auth().currentUser) {
//       // redirect to login page if not logged in
//       next({
//         path: '/register',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       next(); // proceed to route
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (firebase.auth().currentUser) {
//       // redirect to dashboard
//       next({
//         path: '/account',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     }
//    } else {
//       next();
//    }
// });

// Navigation Guards (working)
myRouter.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !currentUser) {
    // MUST be signed in, but NOT signed in
    next('login');
  // } else if (!requiresAuth && currentUser) next('account');
  } else if (requiresGuest && currentUser) {
    // MUST NOT be signed in, but signed in
    next('account')
  } else {
    // no restrictions, proceed
    next();
  }
});

export default myRouter;
