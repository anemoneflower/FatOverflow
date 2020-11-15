import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
  {
    path: "/", //:bookKey",
    name: "Home",
    component: function() {
      return import("../App.vue")
    }
    /* props: (route) => ({ bookKey: route.params.bookKey || 'default' }) */
  },
  {
    path: "/participate",
    name: "Participate",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "../pages/Participate.vue"
      );
    }
  },
];

const router = new VueRouter({
  routes
});

export default router;
