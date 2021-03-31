import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import Routes from './routes.js'
import firebase from 'firebase';

// from file: routes.js
import Home from './components/Home.vue'
// import Delivery from './components/Delivery.vue'
import Reservation from './components/Reservation.vue'
// import Pickup from './components/Pickup.vue'
import CustSignup from './components/CustSignup.vue'
import RestSignup from './components/RestSignup.vue'
import SignupSuccess from './components/SignupSuccess.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import TopRated from './components/TopRated.vue'
import Featured from './components/Featured.vue'
import ContactUs from './components/ContactUs.vue'
// end of import from routes.js

import DashboardC from './components/DashboardC.vue';
import DashboardR from './components/DashboardR.vue';
import Delivery from './components/Delivery.vue';
import OrdertoDelivery from './components/OrdertoDelivery.vue';
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
    { path: '/', component: Home },
    { path: '/toprated', component: TopRated },
    { path: '/featured', component: Featured },
    { path: '/contactus', component: ContactUs },
    // { path: '/reservation', component: Reservation},
    { path: '/reservation', component: Reservation, meta: {requiresAuth: true}},
    // { path: '/pickup', component: Pickup }
    { path: '/signup-cust', component: CustSignup, meta: {requiresGuest: true}},
    { path: '/signup-rest', component: RestSignup, meta: {requiresGuest: true}},
    { path: '/signup-success', component: SignupSuccess},
    { path: '/login', name: 'login', component: Login, meta: {requiresGuest: true}},
    { path: '/register', name: 'register', component: Register, meta: {requiresGuest: true}},

    { path: '/account', component: DashboardC, meta: {requiresAuth: true}},
    { path: '/accountR', component: DashboardR, meta: {requiresAuth: true}},
    { name:'delivery', path: '/delivery', component: Delivery, props:true, meta: {requiresAuth: true}},
    //{ path: '/delivery', component: Delivery, meta: {requiresAuth: true}},
    { path: '/ordertoDelivery', component: OrdertoDelivery, meta: {requiresAuth: true}},
    { path: '/settings', component: Settings}

  ],
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter,
  data: {
    userId: ''
  },
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
