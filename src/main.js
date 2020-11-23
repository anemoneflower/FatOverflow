import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase";
import router from './router'
import store from './store'
import Notifications from 'vue-notification'

Vue.use(Notifications);

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
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
//

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


