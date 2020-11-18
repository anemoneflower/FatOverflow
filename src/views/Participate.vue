<template>
  <div class="main" style="margin-top: 150px">
    <a class="title" style="margin: auto; text-align: center;">
      participate in group purchase: {{ purchaseTitle }}
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <div style="display: flex; width: 900px; margin: auto">
      <div class="foodImg">
        <img src="../assets/logo.png" width="150px" height="150px" alt="">
      </div>
      <div class="inputLayout">
        <div class="inputRows">
          <Dropdown :options="itemArray" :selected="item" v-on:updateOption="methodToRunOnSelect"></Dropdown>
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
            Submit and Add Product +
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
import { db } from "../main";
// import { userKey, selectedBook, selectedBookNote } from "../main";
import Dropdown from "../components/Dropdown";
export default {
  name: "Participate",
  components: {Dropdown},
  props: {
    purchaseTitle: String,
    'dropdown': Dropdown,
  },
  data() {
    return {
      quantity:"",
      note:"",
      itemArray: ["1","2"],
      item: 'Please select item you want to purchase.',
    };
  },
  methods: {
    add_product: function() {
      //TODO: need to link with firebase here
      console.log("add_product!!");
    },
    submit_purchase: function() {
      console.log("submit_purchase!");
      console.log(this.item);
      console.log(this.quantity);
      console.log(this.note);
      this.note = this.note.replace(/(\r\n|\n|\r)/gm, "<br>");

      var date = Date().toString().split(" ");
      date.splice(0, 1);
      date.splice(0, 0, date[1]);
      date.splice(2, 1);
      date.splice(4);
      console.log(date);

      var purchase = {
        date: date.join(" "),
        // itemKey: this.itemKey,
        item: this.item,
        quantity: this.quantity,
        note: this.note,
        // userKey: this.userKey,
        // userId: this.userId,
      };

      // TODO: change after applying group purchase DB
      var ref = db.ref("groupPurchase/"+"-MMPFFDBm2EZw2-Wuwob"+"/participant");
      var purchaseKey = ref.push(purchase).key;
      ref.child(purchaseKey)
              .update({
                _key: purchaseKey
              });


    },
    methodToRunOnSelect(payload) {
      this.item = payload;
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
  width: 250px;
  height: 40px;
}

.submitBtn {
  margin: auto;
  margin-left: 210px;
  width: 100px;
  height: 40px;
}
</style>
