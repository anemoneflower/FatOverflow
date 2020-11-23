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
          @focus="visibleOptions = true"
          @focusout="visibleOptions = false"
        />
        <a
          ><img
            class="glass"
            src="../assets/magnifying-glass.png"
            @click="searchResult()"
            title="this is search bar"
        /></a>
      </li>
      <!--      <li  v-if="visibleOptions" >-->
      <div class="options" ref="optionsList" @focusout="selectAction = false">
        <ul >
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
      // selectedFood: null,
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
  mounted(){
    let query = this.$route.query.result;
    if (query!==undefined){
      this.searchData = query;
    }
    this.visibleOptions = false;
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
  }
  ,
  methods: {
    foodSelected(index) {
      this.selectAction = true;
      this.selected = index;
      this.searchData = this.matches[index];
      // this.selectedFood = this.matches[index];
      this.searchResult();
    },
    searchResult() {
      if(this.searchData==""){
        return [];
      }
      this.visibleOptions = false;
      var path = this.$router.history.current["path"];
      console.log(path);
      // if(path==='/gplist'){
      //   this.$router.push({path:'/gplist',query:{result:this.searchData}});
      //   window.location.reload();
      // }
      if(path==='/products'){
        this.$router.push({path:'/products',query:{result:this.searchData}});
        window.location.reload();
      }
      else{
        this.$router.push({path:'/gplist',query:{result:this.searchData}});
        window.location.reload();
      }


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
      if( this.matches[this.selected] === undefined){
        this.searchResult();
      }
      else{
        this.searchData = this.matches[this.selected];
        // this.selectedFood = this.matches[this.selected];
        this.searchResult();
      }
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
  background: none;
  border-radius: 23px;
}
.popover {
  margin: 0 auto;
  padding: 0;
  width: 720px;
  border: none;
  position: relative;
  left: 0;
  right: 0;
  list-style-type: none;
}
.glass {
  height: 28px;
  position: relative;
  top: 1px;
  left: 10px;
  cursor: pointer;
}
#input {
  width: 650px;
  outline: none;
  border: none;
  height: 45px;
  font-size: 23px;
}
.options {
  width: 675px;
  padding: none;
  position: relative;
  left: 0px;
  margin: none;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0px 35px 50px #d9dbdf;
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