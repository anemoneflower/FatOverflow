<template>
  <div class="wrap">
    <div class="wrap2">
      <img id="banner" src="../assets/logo.png" @click="goHome" v-if="true" />
      <hr id="vertical-line" v-if="true">
      <div class="certification">
        <img
          src="../assets/account.png"
          id="my-page-button"
          v-if="true"
          title="go to mypage"
          @click="goMyPage"
        >
        <router-link to="/sign-in"
          ><button id="sign-in-button" @click="goSignIn" v-if="false">
            Sign In
          </button></router-link
        >
      </div>
    </div>
    <hr id="bot-line" v-if="true">
  </div>
</template>

<script>
// import firebase from "firebase";
// import {userList} from "../main";
import { bookList, current, isSignIn, selectedBook, userKey } from "../main";
export default {
  data: function() {
    return {
      isSelected: true,
      isSignIn: isSignIn[0],
      readNoteIsOpen: false,
      writeNoteIsOpen: false,
      quizIsOpen: false,
      selected: selectedBook.length
    };
  },
  methods: {
    isBookSelected() {
      var curPath = this.$router.history.current["path"];
      var trim = curPath.split("/");
      console.log(`select check: ${trim[trim.length - 1]}`);
      return trim[trim.length - 1].length > 10;
    },
    goHome() {
      var curPath = this.$router.history.current["path"];
      console.log(`curpath: ${curPath}`);
      if (curPath === "/") return;
      var trim = curPath.split("/");
      console.log(`select check - banner: ${trim[trim.length - 1]}`);
      if (trim[trim.length - 1].length > 10)
        this.$router.push("/selected-book/" + trim[trim.length - 1]);
      else this.$router.push("/");
    },
    goMyPage() {
      var curPath = this.$router.history.current["path"];
      var trim = curPath.split("/");
      if (trim[trim.length - 1].length > 10)
        this.$router.push("/my-page/" + trim[trim.length - 1]);
      else this.$router.push("/my-page/none");
    },
    goSignIn() {
      var currentUrl = this.$router.history.current["path"];
      current.push(currentUrl);
    },
    goReadNote() {
      if (selectedBook.length == 0) {
        alert("Please search & select book!");
      } else {
        var curPath = this.$router.history.current["path"];
        var trim = curPath.split("/");
        var bookKey = trim[trim.length - 1];
        this.$router.push("/book-note-board/" + bookKey);
      }
    },
    goWriteNote() {
      if (selectedBook.length == 0) {
        alert("Please search & select book!");
      } else {
        var curPath = this.$router.history.current["path"];
        var trim = curPath.split("/");
        var bookKey = trim[trim.length - 1];
        this.$router.push("/write-note/" + bookKey);
      }
    },
    getSelectedBook() {
      var curPath = this.$router.history.current["path"];
      var trim = curPath.split("/");
      console.log(`select check - get: ${trim[trim.length - 1]}`);
      for (var i = 0; i < bookList.length; i++) {
        var key = bookList[i].key;
        if (key === trim[trim.length - 1]) {
          console.log("found!!!!!" + bookList[i].title);
          return bookList[i].img;
        }
      }
    },
    isNotHome() {
      var curPath = this.$router.history.current["path"];
      if (curPath === "/") return false;
      var trim = curPath.split("/");
      console.log(`select check - banner: ${trim[trim.length - 1]}`);
      if (trim[trim.length - 2] === "selected-book") return false;
      return true;
    },
    isNotSignInPage() {
      return this.$router.history.current["path"] != "/sign-in";
    },
  },
  computed: {
    // select(){
    //     if(selectedBook.length!=0){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
    // },
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
.main-menu,
#booknote-submenu,
#quiz-submenu {
  margin: 0;
  padding: 0;
  list-style-type: none;
  cursor: pointer;
}
#booknote-read {
  position: absolute;
  display: inline-block;
  top: 27px;
  right: 120px;
  width: 160px;
}
#booknote-write {
  position: absolute;
  display: inline-block;
  top: 27px;
  right: 280px;
  width: 160px;
}
.main-menu > li {
  position: relative;
  float: left;
  padding: 8px 15px 10px 15px;
}
.main-menu > li > a {
  font-size: 25px;
}
#booknote-submenu {
  position: absolute;
  display: block;
}
#booknote-submenu > li {
  padding: 15px 0px 5px 0px;
  font-size: 20px;
  text-align: left;
}
#my-page-button {
  position: absolute;
  right: 4%;
  top: 11px;
  width: 43px;
  cursor: pointer;
}
#sign-in-button {
  background-color: #48C964;
  color: #fff;
  border-radius: 13px;
  border-width: 0px;
  padding: 6px 13px 8px 13px;
  font-size: 25px;
  position: absolute;
  right: 3.5%;
  top: 12px;
  cursor: pointer;
  outline: none;
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