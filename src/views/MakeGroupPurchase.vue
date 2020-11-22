<template>
  <div id="app" class="main" style="margin-top: 70px">
    <a class="title" style="margin: auto; text-align: center;">
      Make Group Purchase
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <div class=rowDiv>
      <a class="subTitle">Title</a>
      <input
        class="titleInput inputBorder"
        v-model="postTitle"
        type="text"
        placeholder="Title"
      />
    </div>
    <div class=rowDiv>
      <div style="width: 350px; height: 50px; float:left;">
        <a class="subTitle" style="margin-left:10%">Website</a>
        <input
          class="websiteInput inputBorder"
          v-model="website"
          type="text"
          placeholder="Website"
        />
      </div>
      <div style="width: 350px; height: 50px; float:right;">
        <a class="subTitle">Due Date</a>
        <input
          class="dateInput inputBorder"
          v-model="date"
          type="text"
          placeholder="Due date in format YYYY/MM/DD"
        />
      </div>
    </div>
    <div class="rowDiv">
      <a class="subTitle">Shipping Place</a>
      <vSelect 
        :options="options"
        v-model="shipping"
        placeholder="Please select shipping destination"
        style="padding-top:23px; width:92%; margin-left:4%;"
      >s</vSelect>
    </div>
    <div class="rowDiv" style="height:220px;">
      <a class="subTitle">Notes</a>
      <textarea
        class="commentInput inputBorder"
        v-model="note"
      ></textarea>
    </div>
    <div class="rowDiv" style="height:7px">
      <a class="subTitle">Products</a>
    </div>
    <div class="rowDiv" style="height:50px;">
      <!-- <button v-on:click="addProduct" class="addBtn btns">
        Add Product +
      </button> -->

        <!-- <input
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
        /></a> -->
        <!-- <SearchProduct v-if="showModal" @close="showModal = false">
          <h3 slot="header">custom header</h3>
        </SearchProduct> -->
        <Popup 
          successText="Make Group Purchase Successful"
          v-if="showModal" 
          @close="showModal = false"
          >
          <h3 slot="header"></h3>
        </Popup>
        
        <SearchBar 
          @clickedItem="onClickItem"
          @clickedItem_key="onClickItem_key"
          @clickedAdd="onClickAdd"
          style="padding-top:1px"
          v-if="!showModal"
        />
      <!-- <button v-on:click="addProduct" class="submitBtn btns">
        Add Product
      </button> -->
      <div style="margin: 50px 0 0 4%;">
        <div
          v-for="(product, index) in productList"
          :key = "index"
          style="margin-top: 5px; height: 110px;"
        >
          <AddedProduct
            :product="product"
            v-if="!showModal"
          ></AddedProduct>
          <button
            v-on:click="removeProduct(index)"
            class="removeButton"
            v-if="!showModal"
          >
           Remove
          </button>
         </div>
        <div class="rowDiv">
          <button v-on:click="createPurchase" class="submitBtn btns">
            Submit
          </button>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
import { db } from "../main";
import AddedProduct from "../components/AddedProduct.vue"
// import SearchProduct from "./SearchProduct.vue"
import SearchBar from "../components/SearchBar_Add.vue"
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';



function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
export default {
  name: "GroupPurchase",
  components: {
    AddedProduct,
    // SearchProduct,
    SearchBar,
    vSelect
  },
  props: {
    _postId: String,
  },

  data() {
    return {
      productList: [],
      postTitle: "Join me",
      website: "www.ocook.com",
      date: "2020/12/21",
      note:"Hi",
      showModal: false,
      shipping: "",
      searchBarName: "",
      searchBarKey: "",
      options: [
        'sarang',
        'mir'
      ]
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
      console.log(this.shipping)
      console.log(JSON.stringify(this.productList))
      const foodKeyList = this.productList.map(x => x.key)
      console.log(JSON.stringify(foodKeyList))

      let createPurchase = {
        userKey: "unknown_sdd",
        closedDate: dueDate,
        content: this.note,
        openDate: currentDate,
        registeredFood: foodKeyList,
        isClosed: false,
        shipping: this.shipping,
        participant: [],
        website: this.website,
      };
      console.log(createPurchase);

      // To do: put into DB
      var ref = db.ref("groupPurchase/");
      var createPurchaseKey = ref.push(createPurchase).key;
      console.log(createPurchaseKey)
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
    // addProduct: function() {
    //   console.log("Add product");
    //   this.productList.push({title: this.searchBarName, key: this.searchBarData[1]})
    // },
    onClickItem (value) {
      console.log("OnClickItem called")
      console.log(value);
      this.searchBarName = value;
    },
    onClickItem_key (value) {
      console.log("OnClickItem_key called")
      console.log(value);
      this.searchBarKey = value;
    },
    onClickAdd() {
      this.productList.push({title: this.searchBarName, key: this.searchBarKey})
      console.log("OnClickAdd called");
      console.log("Searchbar data is")
      console.log(JSON.stringify(this.productList))
    },
    removeProduct(index) {
      console.log("Remove product");
      this.productList.splice(index, 1);
    }
  }
};


</script>

<style scoped>
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
  box-shadow: 0px 0px 10px 70px #48C964;
}
.outer {
  width: 300px;
  height: 3px;
  margin: 5px auto 30px;
  /* alignment: left; */
  overflow: hidden;
  position: relative;
  /* background-color: #f37022; */
  outline: none;
}
.rowDiv {
  margin-left: auto;
  margin-right: auto;
  width: 700px;
  height: 50px;
  margin-top: 15px;
}
.subTitle {
  width: 120px;
  height: 20px;
  margin: auto;
  margin-left: 5%;
  text-align: left;
  float:left;
  /* margin-bottom: 30px; */
  font-size: 15px;
  font-weight: bold;
}
.titleInput {
  width: 90%;
  height: 30px;
  outline: none;
}

.inputBorder {
  border-radius: 3px;
  border-color: #cbcbcb;
  border-style: solid;
  border-width: thin;
}

.websiteInput {
  width: 85%;
  height: 30px;
  float: left;
  margin-left: 9%;
}

.dateInput {
  width: 85%;
  margin-left: 9%;
  height: 30px;
  float: right;
}

.commentInput {
  width: 90%;
  height: 200px;
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
  margin-top: 10px;
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

.removeButton {
  background-color: #d83737;
  color: #fff;
  border-radius: 11px;
  border-width: 0px;
  cursor: pointer;
  width: 60px;
  height: 30px;
  margin-left: -20px;
  outline: none;
}
.removeButton:hover {
  background-color: #ce3030;
  color: #f5f5f5;
}

.label {
  font-size: 25px;
}

.shipping {
  font-size: 25px;
}

</style>
