<template>
  <div class="home">
    <img class="lo" alt="Hey you can read it!" src="../assets/logo.png" />
    <search-bar></search-bar>
    <router-link to="/gplist" ><img class="lb" alt="Group Purchase" src="../assets/main_left.png" @click="goPurchaseList"/></router-link>
    <router-link to="/products"><img class="rb" alt="Product" src="../assets/main_right.png" @click="goProductsList"/></router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar_Main.vue";
import firebase from "firebase";
export default {
  name: "Home",
  components: {
    SearchBar
  },
  props: {
    bookKey: {
      type: String,
      default: "none"
    }
  },
  created() {
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  },
  methods: {
    goPurchaseList(){
      this.$router.push("/gplist");
    },
    goProductsList(){
      this.$router.push("/products");
    }
  }
};
</script>

<style scoped>
.home {
  position: relative;
}
.lo {
  position: relative;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 575px;
}
.rb {
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 120px;
  margin-left: 20px;
  width: 225px;
  cursor: pointer;
}
.rb:hover {
  content: url('../assets/main_right_hover.png')
}
.lb {
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 120px;
  margin-right: 20px;
  width: 225px;
  cursor: pointer;
}
.lb:hover {
  content: url('../assets/main_left_hover.png')
}
</style>