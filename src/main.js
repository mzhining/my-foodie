import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import firebase from 'firebase';

Vue.config.productionTip = false
Vue.use(VueRouter)

let myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')


// Nav Guards
myRouter.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if not logged in
    if (!firebase.auth().currentUser) {
      // go to login page
      next({
        path: '/register',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next(); // proceed to route
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      // redirect to dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  }
});

export default myRouter;