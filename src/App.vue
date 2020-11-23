<template>
  <div id="app">
    <div class="top">
      <div class="nav" v-if="isNotSignInPage() && isNotHome()">
        <nav-bar :key="selected"></nav-bar>
      </div>
      <div class="bar" v-if="isNotHome() && isNotSignInPage()">
        <search-bar />
      </div>
      <div class="certification" v-if="isNotSignInPage()">
        <img
                src="./assets/account.png"
                id="my-page-button"
                v-if="isSignin()"
                title="go to mypage"
                @click="goMyPage"
        >
        <button id="sign-out-button" @click="goSignOut" v-if="isSignin()">
          Sign Out
        </button>
        <router-link to="/sign-in"
        ><button id="sign-in-button" @click="goSignIn" v-if="!isSignin()">
          Sign In
        </button></router-link
        >
      </div>
    </div>

    <div class="view">
      <router-view />
    </div>
    <notifications group="error" position="top center" classes="my-error"></notifications>
    <notifications group="success" position="top center" classes="my-success"></notifications>
  </div>
</template>

<script> 
import NavBar from "@/components/NavBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import firebase from 'firebase';
import {mapGetters} from "vuex";
import store from "./store";
export default {
  components: {
    NavBar,
    SearchBar
  },
  data: function() {
    return {
      selected: false
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    console.log(firebase.auth().currentUser)
  },
  methods: {
    isSignin() {
      return this.user.loggedIn
    },
    goMyPage() {
      // var curPath = this.$router.history.current["path"];
      // var trim = curPath.split("/");
      // if (trim[trim.length - 1].length > 10)
      //   this.$router.push("/mypage/" + trim[trim.length - 1]);
      this.$router.push("/mypage/participate");
    },
    goSignIn() {
      var currentUrl = this.$router.history.current["path"];
      store.dispatch("pushRoute", currentUrl);
    },
    goSignOut() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        alert(error)
      });
      // window.location.reload();
      this.$router.push("/");
    },
    isNotHome() {
      console.log("isnothome: " + this.$router.history.current["path"]);
      return this.$router.history.current["path"] !== "/";
    },
    isNotSignInPage() {
      console.log("isNotSignInPage: " + this.$router.history.current["path"]);
      return this.$router.history.current["path"] !== "/sign-in";
    },
  }
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.top {
  position: -webkit-sticky;
  position: sticky;
  margin-top: -100px;
  z-index: 3;
  top: 0;
  min-width: 1200px;
}
.nav {
  position: absolute;
  background: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.bar {
  position: absolute;
  top: 23px;
  left: 230px;
  z-index: 2;
}
.view {
  position: relative;
  padding-top: 180px;
}
#my-page-button {
  position: absolute;
  right: 150px;
  top: 20px;
  width: 43px;
  cursor: pointer;
  z-index: 3;
}
#my-page-button:hover {
  content: url('./assets/account_hover.png');
}
#sign-out-button {
  background-color: #48C964;
  color: #fff;
  border-radius: 15px;
  border-width: 0px;
  padding: 9px 13px 9px 13px;
  font-size: 15px;
  position: absolute;
  right: 50px;
  top: 23px;
  cursor: pointer;
  outline: none;
  z-index: 3;
}
#sign-out-button:hover {
  background-color: #43be5d;
  color: #f5f5f5;
}
#sign-in-button {
  background-color: #48C964;
  color: #fff;
  border-radius: 15px;
  border-width: 0px;
  padding: 6px 13px 8px 13px;
  font-size: 18px;
  position: absolute;
  right: 3.5%;
  top: 25px;
  cursor: pointer;
  outline: none;
  z-index: 3;
}
#sign-in-button:hover {
  background-color: #43be5d;
  color: #f5f5f5;
}

.certification {
  margin-top: 10px;
}

.my-error {
  width: 100%;
  padding: 7px;
  margin: 0 5px 5px;
  font-size: 20px;
  color: #ffffff;
  background: #E54D42 !important;
  border-left: 5px solid #B82E24;
}

.my-success {
  width: 100%;
  padding: 7px;
  margin: 0 5px 5px;
  font-size: 20px;
  color: #ffffff;
  background: #68CD86 !important;
  border-left: 5px solid #42A85F;
}


</style>
