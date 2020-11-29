<template>
  <div class="main" style="margin-top: 40px">
    <a class="title" style="margin: auto; text-align: center;">
      Participate in Group Purchase:
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <a class="subTitle">
      {{ purchaseTitle }}
    </a>  
    <div style="display: flex; width: 650px; left: 50%; margin-left: -325px; margin-top: 50px; position: absolute;">
      <button v-on:click="submit_purchase" class="submitBtn">
        Submit
      </button>
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
            <tr id="dropdown_group" v-for="(select, index) in selectedOptions" v-bind:key="select.unique">
              <td class="cell">
              <Dropdown class="productinput"
                        :placeholderText="'Please select an item to purchase'"
                        :itemArray="itemArray" :selected="select.item" :index="index" v-on:updateOption="methodToRunOnSelect"></Dropdown>
              </td>
              <td class="cell">
                <input
                        class="quantityinput inputBorder"
                        v-model="select.quantity"
                        type="number"
                        min="1"
                />
              </td>
              <td class="cell">
                <button class="delBtn" v-on:click="delte_purchase(index)">
                  Remove
                </button>
              </td>
            </tr>
          </table>

        <div class="inputRows">
          <p class="tags" style="vertical-align: top; margin-top: 0; margin-left: 15px">Notes</p>
        </div>
        <div class="inputRows" style="height: 200px; margin-top: -15px; margin-left: 15px; margin-bottom:30px;">
          <div>
            <textarea
              class="inputBorder"
              v-model="note"
              style="height: 200px; width: 620px; margin: 0; padding: 0"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from 'firebase';
import Dropdown from "../components/Dropdown";
import {mapGetters} from "vuex";
export default {
    name: "Participate",
    components: {Dropdown},
    props: {
        gpKey: String,
    },
    computed: {
      ...mapGetters({
        previousUrl: "previousUrl"
      })
    },
    data() {
        return {
            unique: 0,
            purchaseTitle: "",
            quantity: "",
            note: "",
            foods: [],
            itemArray: [],
            usedItems: [],
            usedFoods: [],
            selectedOptions: [{key: "", item: 'Please select item you want to purchase.', quantity: 0}],
            showMenu: false,
            placeholderText: "Please select an item to purchase"
        };
    },
    async created() {
      if (firebase.auth().currentUser != null) {
        // console.log(this.gpKey);
        const snapshot = await db.ref('groupPurchase').child(this.gpKey).once('value');
        var value = snapshot.val();
        // console.log("mounted: ");
        // console.log(value);
        this.foods = Object.keys(value.registeredFood);
        // console.log("this.foods:: ", this.foods);
        this.purchaseTitle = value.title;
        // console.log("created: " + this.itemArray);
        // console.log("created: " + this.foods + " len: " + this.foods.length);
        for (var i = 0; i < this.foods.length; i++) {
          // console.log("hoho: " + i + " " + this.foods[i]);
          const snapshot2 = await db.ref('groupPurchase').child(this.gpKey).child('registeredFood').child(this.foods[i])
                  .once('value');
          var val = snapshot2.val();
          // console.log(val);
          // console.log('name:', val);
          // console.log("val: ");
          // console.log(val);
          this.itemArray.push(val.foodName);
          // console.log("check: " + this.itemArray);
        }
      } else {
        this.$router.push('/');
      }
    },
    methods: {
        submit_purchase: function () {
            this.submit();
            //TODO: this.$router.push({ path: `/read-note/${noteKey}/${this.bookKey}` });
            // TODO: https://stackoverflow.com/questions/53788975/vue-router-how-to-get-previous-page-url/53789212
        },
        submit: function () {
            // console.log("submit_purchase!");
            // console.log(this.selectedOptions);
            // console.log(this.quantity);
            // console.log(this.note);
            this.note = this.note.replace(/(\r\n|\n|\r)/gm, "<br>");
            var date = Date().toString().split(" ");
            date.splice(0, 1);
            date.splice(0, 0, date[1]);
            date.splice(2, 1);
            date.splice(4);
            // console.log(date);
            var foodObj = {};
            for (var i=0; i<this.selectedOptions.length; i++){
                if ((this.selectedOptions[i].quantity > 0) && (this.selectedOptions[i].item !== 'Please select item you want to purchase.')){
                    foodObj[this.selectedOptions[i].key] = {name: this.selectedOptions[i].item, quantity: this.selectedOptions[i].quantity}
                }else{
                  // alert("Please Check Product and Quantity!!");
                  this.$notify({
                    group: 'error',
                    title: 'Please Check Product and Quantity!!',
                    // text: 'Hello user! This is a notification!',
                    duration: 5000,
                    type: 'error'
                  });
                  return
                }
            }
            // console.log("foodObj:");
            // console.log(foodObj);
            if(Object.keys(foodObj).length !== 0) {
              var purchase = {
                date: date.join(" "),
                food: foodObj,
                note: this.note,
                // userKey: firebase.auth().currentUser.uid,
                userName: firebase.auth().currentUser.displayName,
                // isConfirmed: false
              };
              // TODO: change after applying group purchase DB
              let ref = db.ref("groupPurchase").child(this.gpKey).child("/participant");
              let chatref = db.ref("groupPurchase").child(this.gpKey).child("/chat");

              let userKey = firebase.auth().currentUser.uid;
              let userName = firebase.auth.currentUser.displayName;
              let d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
              let msg = "User "+userName+" entered purchase.";

              let logKey = chatref.push({
                content: msg.replace(/(\r\n|\n|\r)/gm, "<br>"),
                time: d,
                username: "",
                userkey: userKey,
              }).key;
              chatref.child(logKey).update({
                _key: logKey
              });

              // let content = ("User")

              // console.log(purchase);

              ref.child(userKey).set(purchase);

              let userref = db.ref("users/"+userKey+"/gpList/"+this.gpKey);

              userref.set({
                closed: false,
                participate: true,
                food : foodObj,
                review: false
              });



              this.$notify({
                group: 'success',
                title: 'Successfully submitted your purchase!',
                // text: 'Hello user! This is a notification!',
                duration: 1000,
                type: 'success'
              });
              this.$router.replace(this.previousUrl);
            }else{
              // alert("you didn't select any food");
              this.$notify({
                    group: 'error',
                    title: "you didn't select any food",
                    // text: 'Hello user! This is a notification!',
                    duration: 5000,
                    type: 'error'
                  });
              
            }
        },
        add_dropdown() {
            console.log("add dropdown");
            console.log(this.selectedOptions);
            if (this.selectedOptions.length >= (this.foods.length + this.usedFoods.length)) {
                // alert("You already added enough element of foods!");
                this.$notify({
                    group: 'error',
                    title: 'You already added enough element of foods!',
                    // text: 'Hello user! This is a notification!',
                    duration: 5000,
                    type: 'error'
                  });
                return
            }
            this.selectedOptions.push({unique: this.unique++, key: "", item: 'Please select item you want to purchase.', quantity: 0});
            console.log(this.selectedOptions);
        },
        methodToRunOnSelect({index, payload}) {
            this.selectedOptions[index].item = payload;
            var idx = this.itemArray.indexOf(payload);
            this.selectedOptions[index].key = this.foods[idx];
            var remove1 = this.itemArray.splice(idx, 1)[0];
            var remove2 = this.foods.splice(idx, 1)[0];
            console.log(remove2);
            console.log(remove1);
            this.usedItems.push(remove1);
            this.usedFoods.push(remove2);
            console.log("selected: ");
            console.log(this.selectedOptions);
        },
        delte_purchase(index) {
          if(this.selectedOptions.length!==1){
            var remove = this.selectedOptions.splice(index,1);
            var i = this.usedItems.indexOf(remove[0].item);
            console.log(remove[0]);
            console.log(i);
            console.log(this.usedFoods);
            console.log(this.usedItems);
            this.itemArray.push(this.usedItems.splice(i, 1)[0]);
            this.foods.push(this.usedFoods.splice(i, 1)[0]);
            console.log(this.itemArray);
            console.log(this.foods);
          }
        }
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
  box-shadow: 0px 0px 10px 100px #48C964;
}
.outer {
  width: 420px;
  height: 3px;
  margin: 5px auto 5px;
  /* alignment: left; */
  overflow: hidden;
  position: relative;
  /* background-color: #f37022; */
  outline: none;
}
.subTitle {
  width: 800px;
  height: 30px;
  margin: auto;
  /* text-align: left;
  margin-bottom: 30px; */
  font-size: 23px;
  font-weight: bold;
  color: #3a3a3a;
}
img {
  border: 0.5px solid #3a3a3a;
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
  border-width: thin;
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
  outline: none;
}
.delBtn:hover {
  background-color: #ce3030;
  color: #f5f5f5;
}
.submitBtn {
  margin: auto;
  margin-top: -121px;
  margin-left: 730px;
  width: 100px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  outline: none;
  background-color: white;
  color: #48C964;
  border-radius: 14px;
  border: 2px solid #48C964;
  padding: 6px 13px 6px 13px;
  cursor: pointer;
}
.submitBtn:hover {
  background-color: #48C964;
  color: white;
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