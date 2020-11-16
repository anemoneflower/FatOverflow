<template>
  <div class="home">
    <img class="lo" alt="Hey you can read it!" src="../assets/logo.png" />
    <search-bar></search-bar>
    <img class="lb" alt="Group Purchase" src="../assets/main_left.png" @click="goPurchaseList"/>
    <img class="rb" alt="Product" src="../assets/main_right.png" @click="goProductsList"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar_Main.vue";
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
  methods: {
    goPurchaseList(){

    },
    goProductsList(){

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
.lb {
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 120px;
  margin-right: 20px;
  width: 225px;
  cursor: pointer;
}
</style>