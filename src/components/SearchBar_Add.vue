<template>
  <div class="autocomplete">
    <ul class="popover" style="float:left; margin-left:5%;">
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
          @focus="visibleOptions = true"
          @focusout="visibleOptions = false"
        />
        
        <!-- <a
          ><img
            class="glass"
            src="../assets/magnifying-glass.png"
            @click="searchResult()"
            searchData="this is search bar"
        /></a> -->
      </li>
      <!--      <li  v-if="visibleOptions" >-->
      <div class="options" ref="optionsList" @focusout="selectAction = false">
        <ul v-if="visibleOptions">
          <li
            id="auto"
            @focuson="selectAction = true"
            @mousemove="keyDown = false"
            :key="index"
            v-for="(match, index) in matches"
            @mousedown="foodSelected(index), (visibleOptions = true)"
            @mouseup="(visibleOptions = false)"
            @mouseenter="hover(index)"
            :class="{ selected: selected == index }"
            v-text="match[0]"
          ></li>
        </ul>
      </div>
      <!--      </li>-->
    </ul>
      <button v-on:click="onClickAdd" class="submitBtn btns" style="float:left; margin-left:2%; margin-top: 4px;">
        Add Product
      </button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Autocomplete",
  data() {
    return {
      selectedFood: "",
      searchData: "",
      visibleOptions: true,
      selected: 0,
      selectedKey: "",
      selectedImg: "",
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
                (this.foods).push([gp.foodName, myKey, gp.img]);
              }
            })
    console.log(this.foods);
  },
  methods: {
    foodSelected(index) {
      console.log("Selected:", index)
      const curMatch = this.matches[index];
      console.log("selectedFood:", JSON.stringify(this.matches[index]))
      console.log("selectedFood:", JSON.stringify(this.matches[index][0]))
      console.log("selectedFood:", JSON.stringify(this.matches[index][1]))
      this.selectAction = true;
      this.selected = index;
      this.searchData = curMatch[0];
      this.selectedFood = curMatch[0];
      this.selectedKey = curMatch[1];
      this.selectedImg = curMatch[2];
      this.searchResult();
      this.onClickItem();
      this.onClickItem_key();
      this.onClickItem_img();
    },
    searchResult() {
      // if(this.searchData==""){
      //   return [];
      // }
      console.log("Search result pressed")
      console.log(this.searchData)
    },
    onClickItem: function() {
      console.log("onClickButton pressed")
      this.$emit('clickedItem', this.searchData);
    },
    onClickItem_key: function() {
      console.log("onClickButton_key pressed")
      this.$emit('clickedItem_key', this.selectedKey);
    },
    onClickItem_img: function() {
      console.log("onClickButton_key pressed")
      this.$emit('clickedItem_img', this.selectedImg);
    },
    onClickAdd: function() {
      console.log("onClickAdd pressed")
      this.searchData = "";
      this.$emit('clickedAdd', this.searchData);
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
        this.scroll();
      }
    },
    scroll() {
      this.$refs.optionsList.scrollTop = this.selected * 39;
    },
    enter() {
      this.searchData = this.matches[this.selected][0];
      this.selectedFood = this.matches[this.selected][0];
      this.selectedKey = this.matches[this.selected][1];
      this.selectedImg = this.matches[this.selected][2];
      this.visibleOptions = false;
      this.searchResult();
      this.onClickItem();
      this.onClickItem_key();
      this.onClickItem_img();

    },
    initialCount() {
      this.selected = 0;
    },
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
        food[0].toLowerCase().includes(this.searchData.toLowerCase())
      );
    }
  },
};
</script>

<style scoped>
.autocomplete {
  width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  background: white;
}
.popover {
  margin: 0 auto;
  padding: 0;
  width: 300px;
  border: 1px solid #dcdcdc;
  position: relative;
  left: 0;
  right: 0;
  border-radius: 3px;
  list-style-type: none;
  background: white;
  z-index:3;
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
  width: 240px;
  outline: none;
  border: none;
  height: 40px;
  font-size: 16px;
}
.options {
  width: 250px;
  padding: none;
  position: relative;
  left: 30px;
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
.btns {
  outline: none;
  background-color: #48C964;
  color: #fff;
  border-radius: 10px;
  border-width: 0px;
  font-size: 15px;
  padding: 5px 10px 7px 10px;
  cursor: pointer;
}
.btns:hover {
  background-color: #2f8542;
}
.submitBtn {
  margin: auto;
  width: 125px;
  height: 35px;
}
</style>