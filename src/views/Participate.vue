<template>
  <div class="main" style="margin-top: 70px">
    <a class="title" style="margin: auto; text-align: center;">
      Participate in Group Purchase: {{ purchaseTitle }}
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <div style="display: flex; width: 650px; left: 50%; margin-left: -325px; position: absolute;">
      <div class="inputLayout">
          <table id="dropdown_table">
            <tr>
              <td>
              <button v-on:click = "add_dropdown" class="addBtn btns">
                Add Product
              </button>
              </td>
              <td>
                <p class="tags">Quantity</p>
              </td>
            </tr>
            <tr id="dropdown_group" v-for="(select, index) in selectedOptions" v-bind:key="index">
              <td class="cell">
              <Dropdown class="productinput" :itemArray="itemArray" :selected="select.item" :index="index" v-on:updateOption="methodToRunOnSelect"></Dropdown>
              </td>
              <td class="cell">
                <input
                        class="quantityinput inputBorder"
                        v-model="select.quantity"
                        type="number"
                />
              </td>
              <td class="cell">
                <button class="delBtn">
                  Delete
                </button>
              </td>
            </tr>
          </table>

        <div class="inputRows">
          <p class="tags" style="vertical-align: top; margin-top: 0; margin-left: 15px">Notes</p>
        </div>
        <div class="inputRows" style="height: 200px; margin-top: -15px; margin-left: 15px">
          <div>
            <textarea
              class="inputBorder"
              v-model="note"
              style="height: 200px; width: 620px; margin: 0; padding: 0"
            ></textarea>
          </div>
        </div>
        <div class="inputRows">
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
import firebase from 'firebase';
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
    data() {
        return {
            quantity: "",
            note: "",
            itemArray: ["1", "2"],
            selectedOptions: [{item: 'Please select item you want to purchase.', quantity: 0}],
            showMenu: false,
            placeholderText: "Please select an item to purchase"
        };
    },
    mounted() {
        console.log(this.itemArray);

        if (this.closeOnOutsideClick) {
            document.addEventListener("click", this.clickHandler);
        }
    },
    methods: {
        submit_purchase: function () {
            this.submit();
            //TODO: this.$router.push({ path: `/read-note/${noteKey}/${this.bookKey}` });
            // TODO: https://stackoverflow.com/questions/53788975/vue-router-how-to-get-previous-page-url/53789212

        },
        submit: function () {
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
                userKey: firebase.auth().currentUser.uid,
                isConfirmed: false
            };

            // TODO: change after applying group purchase DB
            var ref = db.ref("groupPurchase/" + "-MMPFFDBm2EZw2-Wuwob" + "/participant");
            var purchaseKey = ref.push(purchase).key;
            ref.child(purchaseKey)
                .update({
                    _key: purchaseKey
                });
        },
        add_dropdown() {
            console.log("add dropdown");
            console.log(this.selectedOptions);
            this.selectedOptions.push({item: 'Please select item you want to purchase.', quantity: 0});
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
  box-shadow: 0px 0px 10px 125px #48C964;
}
.outer {
  width: 800px;
  height: 3px;
  margin: 5px auto 30px;
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
  width: 50px;
  height: 50px;
  margin: auto;
  margin-right: 0%;
  margin-left: 100px;
}
.inputRows {
  width: 650px;
  height: 40px;
  margin-top: 30px;
  display: grid;
  text-align: left;
  grid-template-columns: 100px 400px auto;
  /*grid-template-rows: repeat(4, 1fr);*/
}

.productinput {
  width: 450px;
  height: 25px;
}

.quantityinput {
  width: 45px;
  height: 25px;
  outline: none;
  margin-left: 10px;
  margin-top: 10px;
}

.tags {
  font-size: 15px;
  text-align: left;
  font-weight: bold;
  margin-left: 6px;
  margin-bottom: 2px;
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
  background-color: #43be5d;
  color: #f5f5f5;
}
.addBtn {
  margin-right: 15px;
  width: 125px;
  height: 35px;
}
.delBtn {
  background-color: #d83737;
  color: #fff;
  border-radius: 11px;
  border-width: 0px;
  cursor: pointer;
  width: 60px;
  height: 30px;
  margin-top: 10px;
  margin-left: 6px;
}
.delBtn:hover {
  background-color: #ce3030;
  color: #f5f5f5;
}

.submitBtn {
  margin: auto auto auto 275px;
  width: 100px;
  height: 40px;
}

.inputLayout {
  margin-top:0;
}

#dropdown_group {
  margin-top: 5px;
}

#dropdown_table {
  margin-left: 15px;
}

.cell {
  padding-right: 10px;
}

</style>
