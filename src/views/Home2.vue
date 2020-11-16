<template>
  <div class="home">
    <img class="lo" alt="Hey you can read it!" src="../assets/logo.png" />
    <search-bar></search-bar>
    <img class="lb" alt="Group Purchase" src="../assets/main_left.png" />
    <img class="rb" alt="Product" src="../assets/main_right.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "Home2",
  components: {
    SearchBar
  },
  props: {
    bookKey: {
      type: String,
      default: "none"
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
  margin-top: 120px;
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
}
.lb {
  position: relative;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 120px;
  margin-right: 20px;
  width: 225px;
}
</style>