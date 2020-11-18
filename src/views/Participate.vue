<template>
  <div class="main" style="margin-top: 150px">
    <a class="title" style="margin: auto; text-align: center;">
      participate in group purchase: {{ purchaseTitle }}
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    
    <div style="display: flex; width: 900px; margin: auto">
     <!-- justify-content: space-around"> -->
      <div class="foodImg">
        <img src="../assets/logo.png" width="150" height="150">
      </div>
      <div class="inputLayout">
        <div class="inputRows">
          <button
            v-on:click="search_food"
            class="foodsearchBtn"
            style="padding: auto"
          >Click here to search food you want to purchase</button>
        </div>
        <div class="inputRows">
          <p class="tags">Quantity</p>
          <input
            class="quantityinput inputBorder"
            v-model="quantity"
            type="number"
          />
        </div>
        <div class="inputRows" style="height: 200px">
          <p class="tags" style="vertical-align: top; margin-top: 0">Notes</p>
          <div>
            <textarea
              class="inputBorder"
              v-model="note"
              style="height: 200px; width: 400px; margin: 0; padding: 0"
            ></textarea>
          </div>
        </div>
        <div class="inputRows">
          <button v-on:click="add_product" class="addBtn btns">
            Add Product +
          </button>
          <button v-on:click="submit_purchase" class="submitBtn btns">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";
// import { db } from "../main";
// import { userKey, selectedBook, selectedBookNote } from "../main";

export default {
  name: "Participate",
  props: {
    // _bookKey: String
    purchaseTitle: String
  },
  data() {
    return {
      food:"",
      quantity:"",
      note:""
    };
  },
  methods: {
    // check: function(e) {
    //   console.log(this.isWholeBook, e);
    //   // if (this.isWholeBook===true){
    //   //   $(".rangeInput").disable();
    //   // }
    // },
    search_food: function() {
      console.log("open foodsearch popup!!");
    },
    add_product: function() {
      //TODO: need to link with firebase here
      // console.log(this.bookTitle);
      // console.log(this.bookKey);
      // console.log(this.userKey);
      // console.log(Date().toString());
      console.log("add_product!!");
    },
    submit_purchase: function() {
      console.log("submit_purchase!");
    }
  }
};
</script>

<style scoped>
p {
  margin: auto;
}

input[type="text"],
textarea {
  border-style: inset;
  border-width: 2px;
}

.title {
  width: 800px;
  height: 30px;
  margin: auto;
  /* text-align: left;
  margin-bottom: 30px; */
  font-size: 25px;
  font-weight: bold;
  color: #3a3a3a;
}
.inner {
  position: absolute;
  width: 40%;
  height: 100%;
  left: 30%;
  background: #48C964;
  box-shadow: 0px 0px 10px 120px #48C964;
}
.outer {
  width: 800px;
  height: 3px;
  margin: 5px auto 60px;
  /* alignment: left; */
  overflow: hidden;
  position: relative;
  /* background-color: #f37022; */
  outline: none;
}
img {
  border: 0.5px solid #3a3a3a;
}
.foodImg {
  width: 150px;
  height: 150px;
  margin: auto;
  margin-right: 0%;
  margin-left: 100px;
  margin-top: 30px;
}
.inputRows {
  width: 700px;
  height: 40px;
  margin-top: 30px;
  margin-left: 30px;
  display: grid;
  text-align: left;
  grid-template-columns: 100px 400px auto;
  /*grid-template-rows: repeat(4, 1fr);*/
}
.foodsearchBtn {
  width: 350px;
  height: 40px;
  margin-left: 10px;
  background: none;
  border-color: #48C964;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  outline:none;
  cursor: pointer;    
  font-size: 15px;
  box-shadow: none;
}
.foodsearchBtn:hover {
  background-color: #48c96479;
  
}
.quantityinput {
  width: 50px;
  height: 40px;
  outline: none;
}

.tags {
  font-size: 15px;
  text-align: right;
  font-weight: bold;
}

.inputBorder {
  border-radius: 3px;
  border-color: #cbcbcb;
  border-style: solid;
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
.addBtn {
  margin: auto;
  margin-left: 50px;
  width: 150px;
  height: 40px;
}

.submitBtn {
  margin: auto;
  margin-left: 210px;
  width: 100px;
  height: 40px;
}
#wholeRange {
  cursor: pointer;
}
#share {
  cursor: pointer;
}
</style>
