<template>
  <div id="app" class="main" style="margin-top: 150px">
    <div class=rowDiv>
      <input
        class="titleInput inputBorder"
        v-model="postTitle"
        type="text"
        placeholder="Title"
      />
    </div>
    <div class=rowDiv>
      <input
        class="websiteInput inputBorder"
        v-model="website"
        type="text"
        placeholder="Website"
      />
      <input
        class="dateInput inputBorder"
        v-model="date"
        type="text"
        placeholder="Due date in format YYYY/MM/DD"
      />
    </div>
    <div class="rowDiv">
      <textarea
        class="commentInput inputBorder"
        v-model="note"
      ></textarea>
    </div>
    <div class="rowDiv">
      <!-- <button v-on:click="addProduct" class="addBtn btns">
        Add Product +
      </button> -->

        <input
          class="addProductSearch"
          autocomplete="off"
          id="input"
          type="text"
          v-model="title"
          placeholder="Find the product to add"
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
            @click="showModal = true"
            title="this is search bar"
        /></a>
        <SearchProduct v-if="showModal" @close="showModal = false">
          <!--
        you can use custom content here to overwrite
        default content
      -->
          <h3 slot="header">custom header</h3>
        </SearchProduct>

      <AddedProduct
              v-for="product in productList"
              :key = "product in productList"
              :product = "product"
              :productKey = "productKey"
      ></AddedProduct>
    </div>
    <div class="rowDiv">
      <button v-on:click="createPurchase" class="submitBtn btns">
        Submit
      </button>
    </div> 
  </div>
</template>

<script>
// import { db } from "../main";
import AddedProduct from "../components/AddedProduct.vue"
import SearchProduct from "./SearchProduct.vue"


function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
export default {
  name: "GroupPurchase",
  components: {
    AddedProduct,
    SearchProduct
  },
  props: {
    _postId: String,
  },

  data() {
    return {
      productList: [{title: 'Harim Chicken Breast'}],
      showProduct: true,
      postTitle: "Join me",
      website: "www.ocook.com",
      date: "2020/12/21",
      note:"Hi",
      showModal: false,
    };
  },
  methods: {
    participate: function() {
      console.log("Clicked participate");
    },
    createPurchase: function() {
      // Check validity of input
      if (this.postTitle != "" && this.website != "" && this.date != "") {
        if (this.isValidDate(this.date)) {
          this.submit();
        }
        else {
          console.log("Invalid date format");
        }
      }
      else {
        console.log("Missing content")
      }
      
    },
    submit: function() {
      console.log("create_purchase!");
      console.log(this.postTitle);
      console.log(this.website);
      console.log(this.date);
      // this.note = this.note.replace(/(\r\n|\n|\r)/gm, "<br>");
      console.log(this.note)
      const dueDate = this.date.split("/").join("")
      console.log(dueDate);

      const tmpDate = new Date()
      const day = tmpDate.getDate()
      const month = tmpDate.getMonth() + 1
      const year = tmpDate.getFullYear()
      const currentDate = year.toString() + month.toString() + day.toString()
      console.log(currentDate);

      let createPurchase = {
        createDate: currentDate,
        user_db_key: "unknown_sdd",
        foodList: "unknown",
        title: this.postTitle,
        website: this.website,
        note: this.note,
        userList: "unknown",
        dueDate: this.dueDate
      };
      console.log(createPurchase);

      // To do: put into DB

    },
    isValidDate: function() {
      if (this.date.includes('/')) {
        let tmpDate = this.date.split("/");
        console.log(tmpDate);
        if (tmpDate.length == 3) {
          if ( isInt(tmpDate[0]) 
          && isInt(tmpDate[1]) 
          && isInt(tmpDate[2])
          && parseInt(tmpDate[0]) > 2000
          && parseInt(tmpDate[0]) < 2100
          && parseInt(tmpDate[1]) > 0
          && parseInt(tmpDate[1]) < 13
          && parseInt(tmpDate[2]) > 0
          && parseInt(tmpDate[2]) < 32) {
            return true;
          }
          else {
            return false;
          }
        }
      }
      return false;
    },
    addProduct: function() {
      console.log("Add product");
    }
  }
};


</script>

<style scoped>

.rowDiv {
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  margin-top: 20px;
}

.titleInput {
  width: 100%;
  height: 30px;
  outline: none;
}

.inputBorder {
  border-radius: 3px;
  border-color: #cbcbcb;
  border-style: solid;
}

.websiteInput {
  width: 390px;
  height: 30px;
  float: left;
}

.dateInput {
  width: 380px;
  margin-left: 10px;
  height: 30px;
  float: left;
}

.commentInput {
  width: 100%;
  height: 400px;
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
  width: 100px;
  height: 40px;
}

.glass {
  height: 28px;
  position: relative;
  top: 1px;
  left: 10px;
  cursor: pointer;
}

.addProductSearch {
  width: 80%;
  height: 40px;
  font-size: 20px;
}

</style>
