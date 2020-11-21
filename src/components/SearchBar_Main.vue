<template>
  <div class="autocomplete">
    <ul class="popover">
      <li>
        <input
          autocomplete="off"
          id="input"
          type="text"
          v-model="searchData"
          placeholder="Search what do you want to eat."
          @keydown.up="keyup"
          @keydown.down="keydown"
          @keydown.enter="enter"
          v-focus
          @focus="visibleOptions = true"
          @focusout="visibleOptions = false"
        />
        <a
          ><img
            class="glass"
            src="../assets/magnifying-glass.png"
            @click="searchResult()"
            searchData="this is search bar"
        /></a>
      </li>
      <!--      <li  v-if="visibleOptions" >-->
      <div class="options" ref="optionsList" @focusout="selectAction = false">
        <ul>
          <li
            id="auto"
            @focuson="selectAction = true"
            @mousemove="keyDown = false"
            :key="index"
            v-for="(match, index) in matches"
            @mousedown="foodSelected(index), (visibleOptions = true)"
            @mouseenter="hover(index)"
            :class="{ selected: selected == index }"
            v-text="match"
          ></li>
        </ul>
      </div>
      <!--      </li>-->
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Autocomplete",
  data() {
    return {
      selectedFood: null,
      searchData: "",
      visibleOptions: true,
      selected: 0,
      keyDown: false,
      selectAction: false,
      foods: []
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.selectAction = false;
  },
  mounted() {
    firebase
            .database()
            .ref("/food")
            .once("value",snapshot => {
              var myValue = snapshot.val();
              var keyList = Object.keys(myValue);
              for(var i = keyList.length; i>0; i--){
                var myKey = keyList[i-1];
                var gp = myValue[myKey];
                (this.foods).push(gp.foodName);
              }
            })
    console.log(this.foods);
  },
  methods: {
    foodSelected(index) {
      this.selectAction = true;
      this.selected = index;
      this.searchData = this.matches[index];
      this.selectedFood = this.matches[index];
      this.searchResult();
    },
    searchResult() {
      if(this.searchData==""){
        return [];
      }
      // var book = this.searchData;
      // var checkList = JSON.parse(JSON.stringify(bookList));
      // console.log(checkList);
      // var idx = 0;
      // for (var i = 0; i < bookList.length; i++) {
      //   var searchData = bookList[i].searchData.toUpperCase();
      //   var checkValue = searchData.indexOf(book.toUpperCase());
      //   console.log(checkValue);
      //   if (checkValue != -1) {
      //     searchedList.push(bookList[i]);
      //     checkList.splice(i + idx, 1);
      //     idx--;
      //   }
      // }
      // if (checkList.length != 14) {
      //   for (var j = 0; j < checkList.length; j++) {
      //     if (searchedList[0].series == checkList[j].series) {
      //       searchedList.push(checkList[j]);
      //     }
      //   }
      // }
      this.$router.push({path:'gplist',query:{result:this.searchData}})
      // var curPath = this.$router.history.current["path"];
      // var trim = curPath.split("/");
      // console.log(`select check: ${trim[trim.length - 1]}`);
      // if (trim[trim.length - 1].length > 10)
      //   this.$router.push("/gpList/" + trim[trim.length - 1]);
      // else this.$router.push("/gpList/none");
      // this.visibleOptions = false;
      // this.selectAction = false;
      // this.searchData = "";
    },
    hover(index) {
      if (this.keyDown == false) {
        this.selected = index;
      }
    },
    keyup() {
      this.keyDown = true;
      if (this.selected == 0) {
        return;
      }
      this.selected -= 1;
      // this.title = this.matches[this.selected];
      this.scroll();
    },
    keydown() {
      this.keyDown = true;
      if (this.selected < this.matches.length - 1) {
        this.selected += 1;
        // this.title = this.matches[this.selected];
        this.scroll();
      }
    },
    scroll() {
      this.$refs.optionsList.scrollTop = this.selected * 39;
    },
    enter() {
      this.searchData = this.matches[this.selected];
      this.selectedFood = this.matches[this.selected];
      this.searchResult();
    },
    initialCount() {
      this.selected = 0;
    }
  },
  computed: {
    matches() {
      if (this.searchData == "") {
        return [];
      }
      if (this.visibleOptions == false && this.selectAction == false) {
        return [];
      }
      this.initialCount();
      return this.foods.filter(food =>
        food.toLowerCase().includes(this.searchData.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.autocomplete {
  width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  background: white;
  border-radius: 23px;
}
.popover {
  margin: 0 auto;
  padding: 0;
  width: 575px;
  border: 1px solid #dcdcdc;
  position: relative;
  left: 0;
  right: 0;
  border-radius: 23px;
  list-style-type: none;
}
.popover:hover {
  box-shadow: 1px 1px 8px 1px #dcdcdc;
}
.popover:focus-within {
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  outline: none;
}
.glass {
  height: 20px;
  position: relative;
  top: 5px;
  left: 10px;
  cursor: pointer;
}
#input {
  width: 500px;
  outline: none;
  border: none;
  height: 45px;
  font-size: 16px;
}
.options {
  width: 520px;
  padding: none;
  position: relative;
  left: 27.3px;
  margin: none;
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
}
.options::-webkit-scrollbar {
  width: 10px;
  height: 150px;
}
.options::-webkit-scrollbar-track {
  background-color: #dcdcdc;
}
.options::-webkit-scrollbar-thumb {
  background-color: #c4c4c4;
}
.options ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
}
.options ul li {
  border-bottom: none;
  padding: 10px 0px 10px 0px;
  cursor: pointer;
  background-color: white;
}
/*.options ul li:hover {*/
/*  background-color: #dcdcdc;*/
/*}*/
.options ul li.selected {
  background-color: #dcdcdc;
}
</style>