import Vue from 'vue'
import VueRouter from 'vue-router'
import { Auth } from '../firebase/auth';
import Home from '../views/Home.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      auth:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/user/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/Login.vue')
  },
  {
    path: '/unverified',
    name: 'Unverified',
    component: () => import(/* webpackChunkName: "unverified" */ '../views/user/Unverified.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
      Auth.onAuthStateChanged(() => {
          const user = Auth.currentUser
          if (!user) {
              next({
                  path: '/login'
              })
          } else if (user.emailVerified) {
            next()
          } else {
             next({
                  path: '/unverified'
              })
          }
      });
  } else {
      next();
  }
});

export default router
