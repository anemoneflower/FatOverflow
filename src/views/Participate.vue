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
<!--        <div class="inputRows">-->
          <table id="dropdown_table">
            <tr>
              <td>
              <button v-on:click = "add_dropdown" class="addBtn">
                Add!!
              </button>
              </td>
            </tr>
            <tr id="dropdown_group" v-for="(select, index) in selectedOptions" v-bind:key="index">
              <td>
              <Dropdown :itemArray="itemArray" :selected="select.item" :index="index" v-on:updateOption="methodToRunOnSelect"></Dropdown>
              </td>
              <td>
                <p class="tags">Quantity</p>
                <input
                        class="quantityinput inputBorder"
                        v-model="select.quantity"
                        type="number"
                />
              </td>
            </tr>
          </table>
<!--        </div>-->

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
<!--          <button v-on:click="add_product" class="addBtn btns">-->
<!--            Submit and Add Product +-->
<!--          </button>-->
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
import Dropdown from "../components/Dropdown";
export default {
  name: "Participate",
  components: {Dropdown},
  props: {
    purchaseTitle: String,
    closeOnOutsideClick: {
      type: [Boolean],
      default: true
    },
    foodKey: {
      type: String,
      default: "sampleFood"
    }
  },
  mounted() {
    console.log(this.itemArray);

    if (this.closeOnOutsideClick) {
      document.addEventListener("click", this.clickHandler);
    }
  },


  data() {
    return {
      quantity:"",
      note:"",
      itemArray: ["1","2"],
      selectedOptions: [{item:'Please select item you want to purchase.', quantity:0}],
      showMenu: false,
      placeholderText: "Please select an item to purchase"
    };
  },
  methods: {
    // add_product: function() {
    //   console.log("add_product!!");
    //   this.submit();
    //   this.selectedOption ='Please select item you want to purchase.';
    //
    //   this.quantity='';
    //   this.note='';
    // },
    submit_purchase: function() {
      this.submit();
      //TODO: this.$router.push({ path: `/read-note/${noteKey}/${this.bookKey}` });
    },
    submit: function() {
      console.log("submit_purchase!");
      console.log(this.selectedOptions);
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
        //TODO: change this food type! => use foodKey
        food: this.selectedOptions,
        note: this.note,
        // userKey: this.userKey,
        // isConfirmed
      };

      // TODO: change after applying group purchase DB
      var ref = db.ref("groupPurchase/"+"-MMPFFDBm2EZw2-Wuwob"+"/participant");
      var purchaseKey = ref.push(purchase).key;
      ref.child(purchaseKey)
              .update({
                _key: purchaseKey
              });
    },
    add_dropdown(){
      console.log("add dropdown");
      // var len = this.selectedOptions.length;
      console.log(this.selectedOptions);
      this.selectedOptions.push({item:'Please select item you want to purchase.', quantity:0});
      console.log(this.selectedOptions);
      },
    methodToRunOnSelect({index, payload}) {
      this.selectedOptions[index].item = payload;
      console.log("selected: ");
      console.log(this.selectedOptions);
    },
  },

  }

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
  margin: auto auto auto 50px;
  width: 250px;
  height: 40px;
}

.submitBtn {
  margin: auto auto auto 210px;
  width: 100px;
  height: 40px;
}


</style>
