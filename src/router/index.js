import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/gplist",
    name: "GroupPurchaseList",
    props: true,
    component: function() {
      return import("../views/GroupPurchaseList.vue");
      // return import("../components/GPCard.vue");
    }
  },
  {
    path: "/participate/:gp",
    name: "Participate",
    props: route => ({gpKey: `${route.params.gp}`}),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "../views/Participate.vue"
      );
    }
  },
  {
    path: "/gp",
    name: "GroupParticipate",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "../views/GroupPurchase.vue"
      );
    }
  },
  {
    path: "/mgp",
    name: "MakeGroupPurchase",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "../views/MakeGroupPurchase.vue"
      );
    }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: function() {
      return import("../views/SignIn.vue");
    }
  },
  {
    path: "/products",
    name: "Products",
    component: function() {
      return import("../views/ProductList.vue");
    }
  },
  {
    path: "/chat",
    name: "Chat",
    component: function () {
      return import("../views/Chat.vue");

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
