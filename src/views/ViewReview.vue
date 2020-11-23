<script>
  import { db } from "../main";
  import firebase from "firebase";
  import Vue from 'vue'
  // import CreateReview from "../components/CreateReview"
  import RadarChart from "../components/RadarChart"
  export default {
    name: 'modal',
    props: {
      userId: {
        type: String,
        default: "unknown_user_id"
      },
      foodName: {
        type: String,
        default: "unknown food name"
      },
      foodKey: {
        type: String,
        default: "unknown key"
      },
      imgUrl: {
        type: String,
        default: "unknown image url"
      }
    },
    components: {
      // CreateReview,
      RadarChart
    },

    methods: {
      close() {
        this.$emit('close');
      },
      getImage(imgsrc) {
          if(imgsrc == null) {
              return imgsrc;
          }
          return "../assets/placeholder.png"
      },
      createReview: function() {

        // Check validity of input
        if (this.inputEvaluation[0] >= 1 && this.inputEvaluation[0] <=5
        && this.inputEvaluation[1] >= 1 && this.inputEvaluation[0] <= 5
        && this.inputEvaluation[2] >= 1 && this.inputEvaluation[0] <= 5
        && this.inputEvaluation[3] >= 1 && this.inputEvaluation[0] <= 5
        && this.inputEvaluation[4] >= 1 && this.inputEvaluation[0] <= 5
        ) {
          const tmpDate = new Date()
          const day = tmpDate.getDate()
          const month = tmpDate.getMonth() + 1
          const year = tmpDate.getFullYear()
          const currentDate = year.toString() + month.toString() + day.toString()
          const createReview = {
            userKey: this.uid,
            date: currentDate,
            foodKey: this.foodKey,
            ce: parseInt(this.inputEvaluation[0]),
            taste: parseInt(this.inputEvaluation[1]),
            filling: parseInt(this.inputEvaluation[2]),
            convenience: parseInt(this.inputEvaluation[3]),
            undecided: parseInt(this.inputEvaluation[4])
          }
          if (this.reviewKey == "") {
            this.newReview = true
            let ref = db.ref("review/");
            let createReviewKey = ref.push(createReview).key;
            this.reviewKey = createReviewKey;
            // Add evaluation to food
            // ref = db.ref("food/"+this.foodKey + "/evaluation/");
            // createReviewKey = ref.push(this.evaluation)
            console.log(createReviewKey)
          }
          else {
            this.newReview = false
            let ref = db.ref("review/" + this.reviewKey);
            let createReviewKey = ref.update(createReview).key;
            // Add evaluation to food
            // ref = db.ref("food/"+this.foodKey + "/evaluation/");
            // createReviewKey = ref.push(this.evaluation)
            console.log(createReviewKey)            
          }


          // When new rating is added
          if (this.newReview) {
            console.log("Adding new value")
            let tmpAvg = [0, 0, 0, 0, 0]
            console.log("Computing new average")
            console.log(this.avgEvaluation)
            console.log(this.avgCount)
            console.log(this.inputEvaluation)
            tmpAvg[0] = ((this.avgEvaluation[0] * this.avgCount + parseInt(this.inputEvaluation[0])) / (this.avgCount + 1)).toFixed(2)
            tmpAvg[1] = ((this.avgEvaluation[1] * this.avgCount + parseInt(this.inputEvaluation[1])) / (this.avgCount + 1)).toFixed(2)
            tmpAvg[2] = ((this.avgEvaluation[2] * this.avgCount + parseInt(this.inputEvaluation[2])) / (this.avgCount + 1)).toFixed(2)
            tmpAvg[3] = ((this.avgEvaluation[3] * this.avgCount + parseInt(this.inputEvaluation[3])) / (this.avgCount + 1)).toFixed(2)
            tmpAvg[4] = ((this.avgEvaluation[4] * this.avgCount + parseInt(this.inputEvaluation[4])) / (this.avgCount + 1)).toFixed(2)
            this.avgCount = this.avgCount + 1
            this.avgEvaluation = [...tmpAvg]
            this.avgCe = parseFloat(this.avgEvaluation[0])
            this.avgTaste = parseFloat(this.avgEvaluation[1])
            this.avgFilling = parseFloat(this.avgEvaluation[2])
            this.avgConvenience = parseFloat(this.avgEvaluation[3])
            this.avgUndecided = parseFloat(this.avgEvaluation[4])
          }
          else{
            console.log("Change new value")
            let tmpAvg = [0, 0, 0, 0, 0]
            console.log("Computing new average")
            console.log(this.avgEvaluation)
            console.log(this.avgCount)
            console.log(this.inputEvaluation)
            tmpAvg[0] = ((this.avgEvaluation[0] * this.avgCount - parseInt(this.myEvaluation[0]) + parseInt(this.inputEvaluation[0])) / (this.avgCount)).toFixed(2)
            tmpAvg[1] = ((this.avgEvaluation[1] * this.avgCount - parseInt(this.myEvaluation[1]) + parseInt(this.inputEvaluation[1])) / (this.avgCount)).toFixed(2)
            tmpAvg[2] = ((this.avgEvaluation[2] * this.avgCount - parseInt(this.myEvaluation[2]) + parseInt(this.inputEvaluation[2])) / (this.avgCount)).toFixed(2)
            tmpAvg[3] = ((this.avgEvaluation[3] * this.avgCount - parseInt(this.myEvaluation[3]) + parseInt(this.inputEvaluation[3])) / (this.avgCount)).toFixed(2)
            tmpAvg[4] = ((this.avgEvaluation[4] * this.avgCount - parseInt(this.myEvaluation[4]) + parseInt(this.inputEvaluation[4])) / (this.avgCount)).toFixed(2)
            // this.avgCount = this.avgCount + 1
            this.avgEvaluation = [...tmpAvg]
            this.avgCe = parseFloat(this.avgEvaluation[0])
            this.avgTaste = parseFloat(this.avgEvaluation[1])
            this.avgFilling = parseFloat(this.avgEvaluation[2])
            this.avgConvenience = parseFloat(this.avgEvaluation[3])
            this.avgUndecided = parseFloat(this.avgEvaluation[4])
          }
          Vue.set(this.myEvaluation, 0, this.inputEvaluation[0]);
          Vue.set(this.myEvaluation, 1, this.inputEvaluation[1]);
          Vue.set(this.myEvaluation, 2, this.inputEvaluation[2]);
          Vue.set(this.myEvaluation, 3, this.inputEvaluation[3]);
          Vue.set(this.myEvaluation, 4, this.inputEvaluation[4]);
          // this.myEvaluation = this.inputEvaluation.slice(0)
          this.componentKey = !this.componentKey
          this.newReview = true;
        }
        else {
          console.log("Missing content")
        }
        
      },
    },
    data() {
      return {
        inputEvaluation: [0,0,0,0,0],
        myEvaluation: [0,0,0,0,0],
        avgEvaluation: [0,0,0,0,0],
        avgCount: 0,
        uid: "",
        componentKey: 0,
        reviewKey: "",
        newReview: false
      }
    },
    async mounted() {
      this.uid = firebase.auth().currentUser.uid;
      console.log("Mounted wait for foodkey" + this.foodKey)
      const snapshot = await db.ref("review").once("value");
      // const snapshot = await db.ref('users/SVsXvyMLsbUOnof9iAcUy390WZB3').once("value");
      console.log("read done")
      // console.log(snapshot.val())
      const myValue = snapshot.val() && snapshot.val()
      let evalArr = [0, 0, 0, 0, 0]
      let count = 0

      // Find my value
      console.log("myUID is")
      console.log(this.uid)
      for (const key in myValue) {
        console.log(myValue[key].userKey)
        if (myValue[key].userKey == this.uid) {
          console.log("found matching uid")
          this.reviewKey = key;
          console.log(myValue[key])
          Vue.set(this.myEvaluation, 0, myValue[key].ce);
          Vue.set(this.myEvaluation, 1, myValue[key].taste);
          Vue.set(this.myEvaluation, 2, myValue[key].filling);
          Vue.set(this.myEvaluation, 3, myValue[key].convenience);
          Vue.set(this.myEvaluation, 4, myValue[key].undecided);
          Vue.set(this.inputEvaluation, 0, myValue[key].ce);
          Vue.set(this.inputEvaluation, 1, myValue[key].taste);
          Vue.set(this.inputEvaluation, 2, myValue[key].filling);
          Vue.set(this.inputEvaluation, 3, myValue[key].convenience);
          Vue.set(this.inputEvaluation, 4, myValue[key].undecided);
          this.componentKey = !this.componentKey

        }
      }      
      // Compute average
      for (const key in myValue) {
        console.log(myValue[key]);
        if (myValue[key].foodKey == this.foodKey) {
          evalArr[0] = evalArr[0] + parseInt(myValue[key].ce);
          evalArr[1] = evalArr[1] + parseInt(myValue[key].taste);
          evalArr[2] = evalArr[2] + parseInt(myValue[key].filling);
          evalArr[3] = evalArr[3] + parseInt(myValue[key].convenience);
          evalArr[4] = evalArr[4] + parseInt(myValue[key].undecided);
          count = count + 1;
        }
      }
      console.log(evalArr)

      if (count != 0) {
        Vue.set(this.avgEvaluation, 0, (evalArr[0] / count).toFixed(2));
        Vue.set(this.avgEvaluation, 1, (evalArr[1] / count).toFixed(2));
        Vue.set(this.avgEvaluation, 2, (evalArr[2] / count).toFixed(2));
        Vue.set(this.avgEvaluation, 3, (evalArr[3] / count).toFixed(2));
        Vue.set(this.avgEvaluation, 4, (evalArr[4] / count).toFixed(2));
      }
      this.avgCount = count;
      console.log(myValue);
      console.log(this.myEvaluation)
      console.log("Finish mount");
          this.$forceUpdate()
      this.componentKey = !this.componentKey
    }
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h1>Review for {{foodName}}</h1>
          <img class="thumbnail" :src="imgUrl" style="position: relative;" />
          <!-- <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button> -->
        </slot>
      </header>
      <section class="modal-body">
        <!-- <CreateReview 
          :myEvaluation="myEvaluation"
        /> -->

    <div class="rowDiw">
      <p>Please rate using the 5 metrics in the range 1-5, where 1 is the lowest score and 5 is the highest score</p>

      
    </div>
    <div class="rowDiv">
      <label for="ce" class="label">Cost-effective: How beneficial is the product compared to its price?</label>
      <input
        id="ce"
        class="quantityinput inputBorder"
        v-model="inputEvaluation[0]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="taste" class="label">Taste: How good is the taste of this product?</label>
      <input
        id="taste"
        class="quantityinput inputBorder"
        v-model="inputEvaluation[1]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="filling" class="label">Filling: How much full does it feel after having this product?</label>
      <input
        id="filling"
        class="quantityinput inputBorder"
        v-model="inputEvaluation[2]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="convenience" class="label">Convenience: How convenient is it to eat this product?</label>
      <input
        id="convenience"
        class="quantityinput inputBorder"
        v-model="inputEvaluation[3]"
        type="number"
      />
    </div>
    <div class="rowDiv">
      <label for="undecided" class="label">undecided</label>
      <input
        id="undecided"
        class="quantityinput inputBorder"
        v-model="inputEvaluation[4]"
        type="number"
      />
    </div>
      <button v-on:click="createReview" class="submitBtn btns">
        Submit
      </button>



        <slot name="body">
          <div class="columnLeft">
            <p>My evaluation</p>
            cost-effectiveness: {{myEvaluation[0]}}
            taste: {{myEvaluation[1]}}
            filling: {{myEvaluation[2]}}
            convenience: {{myEvaluation[3]}}
            undecided: {{myEvaluation[4]}}
          </div>
          <div>
            <p>Average evaluation</p>
            cost-effectiveness: {{avgEvaluation[0]}}
            taste: {{avgEvaluation[1]}}
            filling: {{avgEvaluation[2]}}
            convenience: {{avgEvaluation[3]}}
            undecided: {{avgEvaluation[4]}}
            <RadarChart class="chart"
              :myCe = "parseInt(myEvaluation[0])"
              :myTaste = "parseInt(myEvaluation[1])"
              :myFilling = "parseInt(myEvaluation[2])"
              :myConvenience = "parseInt(myEvaluation[3])"
              :myUndecided = "parseInt(myEvaluation[4])"
              :avgCe = "parseFloat(avgEvaluation[0])"
              :avgTaste = "parseFloat(avgEvaluation[1])"
              :avgFilling = "parseFloat(avgEvaluation[2])"
              :avgConvenience = "parseFloat(avgEvaluation[3])"
              :avgUndecided = "parseFloat(avgEvaluation[4])"
              :key="componentKey"
            />

            <br>
            Number of ratings: {{avgCount}}
          </div>

        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">

            <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close me!
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:4;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 1300px;
    border-radius: 20px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .thumbnail {
    background: black;
    height: 150px;
    width: 150px;
    overflow: hidden;
    display: block;
  }

  .columnLeft {
    width: 100%;
  }

  .chart {
    width: 500px;
    height: 500px;
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