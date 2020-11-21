<template>
  <div class="wrap">
    <div class="wrap2">
      <img id="banner" src="../assets/logo.png" @click="goHome"/>
      <hr id="vertical-line">
    </div>
    <hr id="bot-line">
  </div>
</template>

<script>
// import firebase from "firebase";
// import {userList} from "../main";
import { userKey } from "../main";
export default {
  data: function() {
    return {
    };
  },
  methods: {
    goHome() {
      var curPath = this.$router.history.current["path"];
      console.log(`curpath: ${curPath}`);
      if (curPath === "/") return;
      else this.$router.push("/");
    },
  },
  computed: {
    userSignIn() {
      console.log(this.selected);
      if (userKey.length == 0) {
        return;
      } else {
        return userKey[0].userId;
      }
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.thumbnail {
  background: black;
  /* height: 70%; */
  width: 85px;
  margin: auto;
  margin-top: 10px;
  overflow: hidden;
  display: block;
}
.wrap {
  position: relative;
  min-width: 1300px;
  height: 100px;
  text-align: center;
  white-space: nowrap;
  margin: 0px 0px 0px 0px;
  color: #3a3a3a;
  background: transparent;
}
.wrap2 {
  margin: 0px 200px 0px 100px;
}
#banner {
  position: absolute;
  top: 12px;
  left: 7%;
  width: 100px;
  cursor: pointer;
}
/* a:hover {
  text-decoration: underline;
} */
a:visited {
  text-decoration: none;
  color: #3a3a3a;
}
a:link {
  text-decoration: none;
  color: #3a3a3a;
}
.main-menu > li {
  position: relative;
  float: left;
  padding: 8px 15px 10px 15px;
}
.main-menu > li > a {
  font-size: 25px;
}

#bot-line {
  position: relative;
  top: 30px;
  width: max;
  height: 0.5px;
  border: none;
  border-bottom: thin solid #48C964;
}

#vertical-line {
  position: relative;
  margin-left: 130px;
  width:0;
  height: 36px;
  border: none;
  border-right: thin solid #BBBBBB;
  top: 12px;
}
</style>