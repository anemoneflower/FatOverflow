import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase";
import router from './router'
import store from './store'

Vue.config.productionTip = false

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-analytics.js"></script>


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDDtj6xiU2qtELb7HwHUz5xqYdFwcEvYnk",
  authDomain: "fatoverflow-96acc.firebaseapp.com",
  databaseURL: "https://fatoverflow-96acc.firebaseio.com",
  projectId: "fatoverflow-96acc",
  storageBucket: "fatoverflow-96acc.appspot.com",
  messagingSenderId: "809692908972",
  appId: "1:809692908972:web:005cb29f0c649b877dbe09",
  measurementId: "G-ZFTCZSSBRY"
};
// Initialize Firebase

var app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

// firebase.analytics();
//
// db.ref("food/").push().set({
//   foodName : "KAI-breast",
//   img : "url",
//   website : "url"
// })
//
// db.ref("groupPurchase/").push().set({
//   username: "Userkey",
//   title: "Ocook Chicken Breast Group Purchase",
//   website:"www.ocook.com",
//   picture : "Local로 할지 고민",
//   content : "I am looking for people wou are wlling to buy lunch boxes and meal plans from this website. The products that slimcook provides are very calorie-friendly and always come with fresh ingredients, so I guarantee that you will enjoy them as much as I do.\n" +
//       "\n" +
//       "As this website requires at least 10 items for free shipping, I will wait until we have at least 10 items to order together.",
//   foodTag : {
//     food1 : "foodkey",
//     food2 : "foodkey"
//   },
//   date : "20201115",
//   participant: {
//     username : "Userkey",
//     isConfirmed : "true",
//     food : {
//       food1 : "foodkey",
//       food2 : "foodkey"
//     }
//   },
//   closedDate : "20201121",
//   isClosed : "false"
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


