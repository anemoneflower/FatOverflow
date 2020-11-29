<template>
  <div id="app" class="main" style="margin-top: 40px; width:1200px; left:50%; margin-left: -600px;">
    <a class="title" style="margin: auto; text-align: center;">
      Make Group Purchase
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <div style="position:fixed; z-index:5; margin-top:-45px; margin-left:270px;">
      <!-- <p 
        class="warningMsg"
        v-if="showWarning"
      >{{warningMsg}}</p> -->
    </div>
    <div class="column_left">
      <div class="rowDiv">
        <a class="subTitle">Title</a>
        <input
          class="titleInput inputBorder"
          v-model="postTitle"
          type="text"
          placeholder="   Type in the title of the post. ex) Group buy for Harim Chicken Breast"
        />
      </div>
      <div class="rowDiv">
        <a class="subTitle">Product url</a>
          <input
            class="titleInput inputBorder"
            v-model="website"
            type="text"
            placeholder="   Type in the url of products for group purchase"
          />
      </div>
      <div class="rowDiv">
        <a class="subTitle">Order Date</a>
<!--        <a style="font-size:13px; font-weight:300; margin-left:-160px;">(Please select when you will order the product(s))</a>-->
        <br>
          <!-- <input
            class="titleInput inputBorder"
            v-model="date"
            type="text"
            placeholder="Type in the closing date of this post in format YYYY/MM/DD"
          /> -->
          <datepicker
            input-style="width: 455px; height: 34px; color: #808080; border-radius: 3px"
            :readonly="true" 
            format="YYYY-MM-DD" 
            :input-attr="{ 'id': 'datePickerInput' }"
            value="Please select when you will order the product(s)"
          />
      </div>
      <div class="rowDiv" style="height: 60px">
        <a class="subTitle">Shipping Place</a>
        <Dropdown style="width:92%; height: 26px;"
                  :itemArray="options"
                  :selected="shipping"
                  :placeholderText="'Please select shipping place.'"
                  :index="0"
                  v-on:updateOption="methodToRunOnSelect"></Dropdown>
      </div>
      <div class="rowDiv" style="height:220px;">
        <a class="subTitle">Notes</a>
        <textarea
          class="commentInput inputBorder"
          v-model="note"
          placeholder="(Optional) Please write some information that may be useful for participants of the group purchase. For example, description of the products, planned ordering date, etc."
        ></textarea>
      </div>
    </div>
    <div class="column_right">
      <div class="rowDiv" style="height:7px">
        <button v-on:click="createPurchase" class="submitBtn">
          Submit
        </button>
        <a class="subTitle">Products</a>
      </div>
      <div class="rowDiv" style="height:50px;">
          <SearchBar 
            @clickedItem="onClickItem"
            @clickedItem_key="onClickItem_key"
            @clickedItem_img="onClickItem_img"
            @clickedAdd="onClickAdd"
            style="padding-top:1px"
            v-if="!showModal"
          />
        <div class="adds">
          <div
            v-for="(product, index) in productList"
            :key = "index"
            style="margin-top: 5px; height: 85px; width: 450px;"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";
import AddedProduct from "../components/AddedProduct.vue"
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar_Add.vue"
import datepicker from 'vue-date-picker'

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
export default {
  name: "GroupPurchase",
  components: {
    AddedProduct,
    SearchBar,
    Dropdown,
    datepicker
  },
  props: {
    _postId: String,
  },
  mounted() {
    if (firebase.auth().currentUser == null) {
      // alert("Please sign in to go to group purchase.");
      this.$notify({
            group: 'error',
            title: 'Please sign in to go to group purchase.',
            // text: 'Hello user! This is a notification!',
            duration: 5000,
            type: 'error'
          });
      this.$router.push("/");
      return;
    }
    this.uid = firebase.auth().currentUser.uid;
    this.userName = firebase.auth().currentUser.displayName;
    console.log("uid is");
    console.log(this.uid)

    let query = this.$route.query;
    if (query.foodName != undefined) {
      console.log("query is not undefined")
      this.productList.push({title: query.foodName, key: query.foodKey, img: query.imgUrl})
    }
    else {
      console.log("query is undefined")
    }
  },
  data() {
    return {
      uid: "",
      username: "",
      productList: [],
      postTitle: "",
      website: "",
      date: "",
      note:"",
      showModal: false,
      shipping: "",
      searchBarName: "",
      searchBarKey: "",
      searchBarImg: "",
      options: [
        'Areum',
        'Galilei',
        'Heemang / Dasom',
        'Hwaam',
        'Jihey',
        'Jilli',
        'Munji',
        'Mir / Narae',
        'Nanum',
        'Nuri',
        'Nadl / Yeoul',
        'On-campus',
        'Sarang',
        'Sejong',
        'Seongsil',
        'Silloe',
        'Somang',
      ],
      warningMsg: "",
      showWarning: false
    };
  },
  methods: {
    participate: function() {
      console.log("Clicked participate");
    },
    createPurchase: function() {
      // Check validity of input
      this.date = document.getElementById('datePickerInput').value
      if (this.postTitle != "" 
        && this.website != "" 
        && this.date != ""
        && this.shipping != ""
        && this.productList.length != 0
        ) {
        if (this.isValidDate(this.date)) {
          if (this.notPastDate()) {
            this.submit();
          }
          else {
            this.$notify({
                group: 'error',
                title: 'Please put a valid order date',
                // text: 'Hello user! This is a notification!',
                duration: 5000,
                type: 'error'
              });          
          }
        }
        else {
            // this.showWarning = true;
            // this.warningMsg = 
            // alert("Please put the date in correct format yyyy/mm/dd")
            this.$notify({
                group: 'error',
                title: 'Please put a valid date',
                // text: 'Hello user! This is a notification!',
                duration: 5000,
                type: 'error'
              });
        }
      }
      else {
        // this.showWarning = true;
        // this.warningMsg = 
        // alert("Please fill in all the content including Title, Website, Due date, Shipping place and Products")
        this.$notify({
                group: 'error',
                title: 'Please fill in all the fields',
                // text: 'Hello user! This is a notification!',
                duration: 5000,
                type: 'error',
              });
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
      const dueDate = this.date.split("-").join("")
      console.log(dueDate);

      const tmpDate = new Date()
      const day = tmpDate.getDate()
      const month = tmpDate.getMonth() + 1
      const year = tmpDate.getFullYear()
      const currentDate = year.toString() + month.toString() + day.toString()
      console.log(currentDate);
      console.log(this.shipping);
      console.log(this.productList[0].key);
      console.log(this.productList.length);
      console.log(this.productList[0].title);

      let createPurchase = {
        userKey: this.uid,
        userName: this.userName,
        closedDate: dueDate,
        title: this.postTitle,
        content: this.note,
        openDate: currentDate,
        // registeredFood: foodKeyList,
        isClosed: false,
        shipping: this.shipping,
        participant: [],
        website: this.website,
      };
      console.log(createPurchase);

      // To do: put into DB
      var ref = db.ref("groupPurchase/");
      var createPurchaseKey = ref.push(createPurchase).key;
      for(let i=0;i<this.productList.length;i++){
        let foodref = db.ref("groupPurchase/"+createPurchaseKey+'/registeredFood/'+this.productList[i].key);
        foodref.set({
          foodName : this.productList[i].title
        })
      }

      let userref = db.ref("users/"+this.uid+"/gpList/"+createPurchaseKey);
      userref.set({
        closed: false,
        participate: false,
        review : false
      });

      let chatref = db.ref("groupPurchase").child(createPurchaseKey).child("/chat");
      let d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
      let msg = '"'+this.userName+'" created purchase.';

      let logKey = chatref.push({
        content: msg.replace(/(\r\n|\n|\r)/gm, "<br>"),
        time: d,
        username: "",
        userkey: "",
      }).key;
      chatref.child(logKey).update({
        _key: logKey
      });


      console.log(createPurchaseKey);
      this.$notify({
                group: 'success',
                title: 'Successfully created!',
                // text: 'Hello user! This is a notification!',
                duration: 1000,
                type: 'success'
              });
      this.$router.push({path:'gp',query:{GP:createPurchaseKey}});
    },
    isValidDate: function() {
      if (this.date.includes('-')) {
        let tmpDate = this.date.split("-");
        console.log(tmpDate);
        if (tmpDate.length == 3 && this.date.length == 10) {
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
    notPastDate: function() {
      const curDate = new Date()
      const day = curDate.getDate()
      const month = curDate.getMonth() + 1
      const year = curDate.getFullYear()
      const tmpDate = this.date.split("-");
      console.log("curDate is")
      console.log(curDate)
      if (parseInt(tmpDate[0]) < year) {
        return false;
      }

      if (parseInt(tmpDate[0]) == year && parseInt(tmpDate[1]) < month) {
        return false;
      }  

      if (parseInt(tmpDate[0]) == year 
          && parseInt(tmpDate[1]) == month 
          && parseInt(tmpDate[2]) < day ) {
        return false;
      }  
      return true;
    },
    // addProduct: function() {
    //   console.log("Add product");
    //   this.productList.push({title: this.searchBarName, key: this.searchBarData[1]})
    // },
    onClickItem (value) {
      console.log("OnClickItem called")
      console.log(value);
      this.searchBarName = value;
      let duplicateExist = false;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.searchBarKey == this.productList[i].key) {
          console.log("duplicate exists")
          duplicateExist = true;
          break;
        }
      }
      if (duplicateExist == false) {
        this.productList.push({title: this.searchBarName, key: this.searchBarKey, img: this.searchBarImg})
        console.log("OnClickAdd called");
        console.log("Searchbar data is")
        console.log(JSON.stringify(this.productList))
      }
    },
    onClickItem_key (value) {
      console.log("OnClickItem_key called")
      console.log(value);
      this.searchBarKey = value;
    },
    onClickItem_img (value) {
      console.log("OnClickItem_img called")
      console.log(value);
      this.searchBarImg = value;
    },
    onClickAdd() {
      if (this.searchBarName != "") {
        let duplicateExist = false;
        for (let i = 0; i < this.productList.length; i++) {
          if (this.searchBarKey == this.productList[i].key) {
            console.log("duplicate exists")
            duplicateExist = true;
            break;
          }
        }
        if (duplicateExist == false) {
          this.productList.push({title: this.searchBarName, key: this.searchBarKey, img: this.searchBarImg})
          console.log("OnClickAdd called");
          console.log("Searchbar data is")
          console.log(JSON.stringify(this.productList))
        }

      }
      else {
        console.log("empty searchBarName")
      }

    },
    removeProduct(index) {
      console.log("Remove product");
      this.productList.splice(index, 1);
    },
    methodToRunOnSelect({index, payload}) {
      // this.selectedOptions[index].item = payload;
      // var idx = this.itemArray.indexOf(payload);
      // this.selectedOptions[index].key = this.foods[idx];
      // var remove1 = this.itemArray.splice(idx, 1)[0];
      // var remove2 = this.foods.splice(idx, 1)[0];
      // console.log(remove2);
      // console.log(remove1);
      // this.usedItems.push(remove1);
      // this.usedFoods.push(remove2);
      console.log(index);
      // console.log(this.selectedOptions);
      this.shipping = payload;
    },
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
  margin: 5px auto 40px;
  /* alignment: left; */
  overflow: hidden;
  position: relative;
  /* background-color: #f37022; */
  outline: none;
}
.rowDiv {
  margin-left: auto;
  margin-right: auto;
  width: 500px;
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
  margin-right: 9%;
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
  margin-top: -95px;
  margin-left: 110px;
  width: 100px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  outline: none;
  background-color: #48C964;
  color: #ffff;
  border-radius: 14px;
  border: 0px;
  padding: 6px 13px 6px 13px;
  cursor: pointer;
}
.submitBtn:hover {
  background-color: #43be5d;
  color: #f5f5f5;
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
  margin-left: 0px;
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
.warningMsg {
  color: #ce3030
}


.column_left {
  float: left;
  width: 600px;
  min-width: 500px;
}

.column_right {
  float: left;
  width: 550px;
  padding-left: 20px;
  min-width: 300px;
}

.adds {
  margin: 50px 0 0 15px;
  position:fixed; 
  height:350px; 
  overflow-y:scroll;
}
.adds::-webkit-scrollbar {
    width: 12px;
}
.adds::-webkit-scrollbar-thumb {
    background-color: none;
    border-radius: 6px;
}
.adds:hover::-webkit-scrollbar-thumb {
    background: #dadada;
}
.adds::-webkit-scrollbar-track {
    background-color: none;
}

.datePickerStyle {
  width: 450px
}

</style>
