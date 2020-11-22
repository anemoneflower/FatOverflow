<template>
  <div class="main">
    <!-- <h1>{{foodName}}</h1>
    <h3>{{website}}</h3> -->
    <div class="rowDiw">
      <p>Please rate using the 5 metrics in the range 1-5, where 1 is the lowest score and 5 is the highest score</p>

      
    </div>
    <div class="rowDiv">
      <label for="ce" class="label">Cost-effective: How beneficial is the product compared to its price?</label>
      <input
        id="ce"
        class="quantityinput inputBorder"
        v-model="evaluation[0]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="taste" class="label">Taste: How good is the taste of this product?</label>
      <input
        id="taste"
        class="quantityinput inputBorder"
        v-model="evaluation[1]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="filling" class="label">Filling: How much full does it feel after having this product?</label>
      <input
        id="filling"
        class="quantityinput inputBorder"
        v-model="evaluation[2]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="convenience" class="label">Convenience: How convenient is it to eat this product?</label>
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
import Vue from 'vue'


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
      default: "foodKey not given"
    },
    myEvaluation: {
      type: Array,
      default: ()=>[0, 0, 0, 0, 0]
    }
  },
  data() {
    return {
      userKey: "unknownId",
      date: "",
      evaluation: [0, 0, 0, 0, 0]
    };
  },
  mounted() {
    Vue.set(this.evaluation, 0, this.myEvaluation[0]);
    Vue.set(this.evaluation, 1, this.myEvaluation[1]);
    Vue.set(this.evaluation, 2, this.myEvaluation[2]);
    Vue.set(this.evaluation, 3, this.myEvaluation[3]);
    Vue.set(this.evaluation, 4, this.myEvaluation[4]);


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

        // Add evaluation to food
        // ref = db.ref("food/"+this.foodKey + "/evaluation/");
        // createReviewKey = ref.push(this.evaluation)
        console.log(createReviewKey)
      }
      else {
        console.log("Missing content")
      }
      
    },

  }
};
</script>

<style scoped>
.rowDiv {
  float: left;
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 100%;
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