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
          <div class="btn-group">
            <li
                    @click="toggleMenu()"
                    class="dropdown-toggle"
                    v-if="selectedOption !== undefined"
            >
              {{ selectedOption }}
              <span class="caret"></span>
            </li>

            <li
                    @click="toggleMenu()"
                    class="dropdown-toggle dropdown-toggle-placeholder"
                    v-if="selectedOption === undefined"
            >
              {{ placeholderText }}
              <span class="caret"></span>
            </li>

            <ul class="dropdown-menu" v-if="showMenu">
              <li v-for="(option, idx) in itemArray" :key="idx">
                <a href="javascript:void(0)" @click="updateOption(option)">
                  {{ option }}
                </a>
              </li>
            </ul>
          </div>
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
export default {
  name: "Participate",
  props: {
    purchaseTitle: String,
    closeOnOutsideClick: {
      type: [Boolean],
      default: true
    }
  },
  mounted() {
    console.log(this.itemArray);

    if (this.closeOnOutsideClick) {
      document.addEventListener("click", this.clickHandler);
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.clickHandler);
  },
  data() {
    return {
      quantity:"",
      note:"",
      itemArray: ["1","2"],
      selectedOption: 'Please select item you want to purchase.',
      showMenu: false,
      placeholderText: "Please select an item to purchase"
    };
  },
  methods: {
    add_product: function() {
      console.log("add_product!!");
      this.submit();
      this.selectedOption ='Please select item you want to purchase.';

      this.quantity='';
      this.note='';
    },
    submit_purchase: function() {
      this.submit();
      //TODO: this.$router.push({ path: `/read-note/${noteKey}/${this.bookKey}` });
    },
    submit: function() {
      console.log("submit_purchase!");
      console.log(this.selectedOption);
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
        item: this.selectedOption,
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
    updateOption(option) {
      console.log(option);
      this.selectedOption = option;
      this.showMenu = false;
    },

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    clickHandler(event) {
      const { target } = event;
      const { $el } = this;

      if (!$el.contains(target)) {
        this.showMenu = false;
      }
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

.btn-group {
  min-width: 400px;
  height: 40px;
  position: relative;
  margin: 10px 1px;
  display: inline-block;
  vertical-align: middle;
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 400px;
  padding: 10px 20px 10px 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688),
  linear-gradient(#d2d2d2, #d2d2d2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dropdown-toggle:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 400px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.dropdown-menu > li > a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #409fcb;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  width: 0;
  position: absolute;
  top: 19px;
  height: 0;
  margin-left: -24px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  right: 10px;
}

li {
  list-style: none;
}

</style>
