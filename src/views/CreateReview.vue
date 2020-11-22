<template>
  <div class="main" style="margin-top: 150px">
    <h1>{{foodName}}</h1>
    <h3>{{website}}</h3>
    <div class="rowDiw">
      <p>Please rate using the 5 metrics in the range 1-5, where 1 is the lowest score and 5 is the highest score</p>
      <p>Cost-effective: How beneficial is the product compared to its price?</p>
      <p>Taste: </p>
      <p>Filling: </p>
      <p>Convenience: </p>
      <p>Undecided: </p>

      
    </div>
    <div class="rowDiv">
      <label for="ce" class="label">cost-effectiveness</label>
      <input
        id="ce"
        class="quantityinput inputBorder"
        v-model="evaluation[0]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="taste" class="label">taste</label>
      <input
        id="taste"
        class="quantityinput inputBorder"
        v-model="evaluation[1]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="filling" class="label">filling</label>
      <input
        id="filling"
        class="quantityinput inputBorder"
        v-model="evaluation[2]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="convenience" class="label">convenience</label>
      <input
        id="convenience"
        class="quantityinput inputBorder"
        v-model="evaluation[3]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="undecided" class="label">undecided</label>
      <input
        id="undecided"
        class="quantityinput inputBorder"
        v-model="evaluation[4]"
        type="number"
      />
    </div>
      <button v-on:click="createReview" class="submitBtn btns">
        Submit
      </button>
  </div>
</template>

<script>
import { db } from "../main";
export default {
  name: "GroupPurchase",
  props: {
    _postId: String,
    foodName: {
      type: String,
      default: "Harim Chicken Breast"
    },
    website: {
      type: String,
      default: "www.naver.com"
    },
    foodKey: {
      type: String,
      default: "asdfasdf"
    },
  },
  data() {
    return {
      userKey: "unknownId",
      date: "",
      evaluation: [1,1,1,1,1]
    };
  },
  methods: {
    createReview: function() {
      // Check validity of input
      if (this.evaluation[0] >= 1 && this.evaluation[0] <=5
      && this.evaluation[1] >= 1 && this.evaluation[0] <= 5
      && this.evaluation[2] >= 1 && this.evaluation[0] <= 5
      && this.evaluation[3] >= 1 && this.evaluation[0] <= 5
      && this.evaluation[4] >= 1 && this.evaluation[0] <= 5
      ) {
        const tmpDate = new Date()
        const day = tmpDate.getDate()
        const month = tmpDate.getMonth() + 1
        const year = tmpDate.getFullYear()
        const currentDate = year.toString() + month.toString() + day.toString()
        const createReview = {
          userKey: "unknown_userkey",
          date: currentDate,
          foodKey: this.foodKey,
          evaluation: this.evaluation
        }
        let ref = db.ref("review/");
        let createReviewKey = ref.push(createReview).key;
        console.log(createReviewKey)
      }
      else {
        console.log("Missing content")
      }
      
    },
    submit: function() {
      console.log("create_review!");
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
        title: this.postTitle
      };
      console.log(createPurchase);
      // To do: put into DB
      var ref = db.ref("groupPurchase/");
      var createPurchaseKey = ref.push(createPurchase).key;
      console.log(createPurchaseKey)
      this.productList = []
      this.postTitle = ""
      this.website = ""
      this.date = ""
      this.note = ""
      this.shipping = ""
      this.searchBarName = ""
      this.searchBarKey = ""
      this.options = []
      this.showModal = true
    },
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
.label {
  margin-right: 20px;
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
</style>