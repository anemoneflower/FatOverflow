<template>
  <div class="home">
    <img class="lo" alt="Hey you can read it!" src="../assets/logo.png" />
    <search-bar></search-bar>
    <div style="width: 490px; position:fixed; left:50%; margin-left:-245px; top: 370px; z-index: 1;">
      <router-link to="/gplist" ><img class="lb" alt="Group Purchase" src="../assets/main_left.png" @click="goPurchaseList"/></router-link>
      <router-link to="/products"><img class="rb" alt="Product" src="../assets/main_right.png" @click="goProductsList"/></router-link>
    </div>
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
  data() {
    return {
      user: ""
    }
  },
  created() {
    this.user = firebase.auth().currentUser;

    if (this.user != null) {
      this.user.providerData.forEach(function (profile) {
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
      if (this.user == null) {
        alert("Please sign in to go to group purchase.");
      }
      else {
        this.$router.push("/gplist");
      }
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
  position: absolute;
  margin: auto;
  margin: -257px 0 20px -288px;
  left: 50%;
  width: 576px;
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