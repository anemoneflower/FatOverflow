import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

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
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
