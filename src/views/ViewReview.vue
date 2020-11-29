<script>
  import { db } from "../main";
  import firebase from "firebase";
  import Vue from 'vue'
  // import CreateReview from "../components/CreateReview"
  import RadarChart from "../components/RadarChart"
  export default {
    name: 'modal',
    props: {
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
      },
      website: {
        type: String,
        default: "unknown website url"
      },
      fromTag: {
        type: Boolean,
        default: false
      },
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
      limitUrlLength: function(url) {
        if (url.length > 30) {
          return url.slice(0, 30) + "..."
        }
        else {
          return url
        }
      }, 
      makeGroupPurchase: function() {
        this.$router.push({path:'/mgp', query:{foodName: this.foodName, foodKey: this.foodKey, imgUrl: this.imgUrl}});
      },
      seeGroupPurchase: function() {
        this.$router.push({path:'/gplist',query:{result:this.foodName}});
      },
      createReview: function() {
        if (this.uid == "") {
          // alert("You should sign in in order to write a review")
          this.$notify({
                    group: 'error',
                    title: "You should sign in in order to write a review",
                    // text: 'Hello user! This is a notification!',
                    duration: 5000,
                    type: 'error'
                  });
          return
        }
        else {
          console.log(this.uid);
        }
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
            portability: parseInt(this.inputEvaluation[4])
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
            this.avgPortability = parseFloat(this.avgEvaluation[4])
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
            this.avgPortability = parseFloat(this.avgEvaluation[4])
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
          // alert("Please select a score for all five metrics");
          this.$notify({
                    group: 'error',
                    title: "Please select a score for all five metrics",
                    // text: 'Hello user! This is a notification!',
                    duration: 5000,
                    type: 'error'
                  });
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
      if (firebase.auth().currentUser != null) {
        this.uid = firebase.auth().currentUser.uid;
      }
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
      console.log("foodkey is")
      console.log(this.foodKey)
      for (const key in myValue) {
        console.log("Found userKey:")
        console.log(myValue[key].userKey)
        console.log("Found foodKey:")
        console.log(myValue[key].foodKey)
        if (myValue[key].userKey == this.uid && myValue[key].foodKey == this.foodKey) {
          console.log("found matching uid")
          this.reviewKey = key;
          console.log(myValue[key])
          Vue.set(this.myEvaluation, 0, myValue[key].ce);
          Vue.set(this.myEvaluation, 1, myValue[key].taste);
          Vue.set(this.myEvaluation, 2, myValue[key].filling);
          Vue.set(this.myEvaluation, 3, myValue[key].convenience);
          Vue.set(this.myEvaluation, 4, myValue[key].portability);
          Vue.set(this.inputEvaluation, 0, myValue[key].ce);
          Vue.set(this.inputEvaluation, 1, myValue[key].taste);
          Vue.set(this.inputEvaluation, 2, myValue[key].filling);
          Vue.set(this.inputEvaluation, 3, myValue[key].convenience);
          Vue.set(this.inputEvaluation, 4, myValue[key].portability);
          this.componentKey = !this.componentKey
        }
      }      
      // Compute average
      console.log("Time to compute average. current food key is")
      console.log(this.foodKey);
      for (const key in myValue) {
        console.log(myValue[key]);
        if (myValue[key].foodKey == this.foodKey) {
          console.log("Found matching foodkey")
          evalArr[0] = evalArr[0] + parseInt(myValue[key].ce);
          evalArr[1] = evalArr[1] + parseInt(myValue[key].taste);
          evalArr[2] = evalArr[2] + parseInt(myValue[key].filling);
          evalArr[3] = evalArr[3] + parseInt(myValue[key].convenience);
          evalArr[4] = evalArr[4] + parseInt(myValue[key].portability);
          count = count + 1;
        }
      }
      console.log("Added all average");
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
           <button
              type="button"
              class="closeBtn"
              @click="close"
              v-if="fromTag"
            >
              x
            </button>
            <button
              type="button"
              class="closeBtn2"
              @click="close"
              v-else
            >
              x
            </button>
          <div id="modalTitle">Review for {{foodName}}</div>
          <div id="modalWebsite">
            <a class="website" v-bind:href="website" target="_blank">
              {(website)}
            </a>
          </div>
          <div class="rightBtns">
            <button v-on:click="makeGroupPurchase" class="mgpBtn" style="margin-top:5px;">
              Make Group Purchase with This Product
            </button>
            <button v-on:click="seeGroupPurchase" class="mgpBtn" style="margin-top:10px;">
              See Group Purchases with This Product
            </button>
          </div>
          <img class="thumbnail2" :src="imgUrl"/>
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

        <slot name="body">
          <div class="columnLeft">
            <div class="numR">
              Number of ratings: {{avgCount}}
            </div>
            <RadarChart class="chart"
              :myCe = "parseInt(myEvaluation[0])"
              :myTaste = "parseInt(myEvaluation[1])"
              :myFilling = "parseInt(myEvaluation[2])"
              :myConvenience = "parseInt(myEvaluation[3])"
              :myPortability = "parseInt(myEvaluation[4])"
              :avgCe = "parseFloat(avgEvaluation[0])"
              :avgTaste = "parseFloat(avgEvaluation[1])"
              :avgFilling = "parseFloat(avgEvaluation[2])"
              :avgConvenience = "parseFloat(avgEvaluation[3])"
              :avgPortability= "parseFloat(avgEvaluation[4])"
              :key="componentKey"
            />
          </div>
          <div class="columnRight">
            <table id="resultTable">
              <th style="width:55px;">Average</th>
              <th style="font-size:18px;">Criteria</th>
              <th style="width:55px;">Mine</th>
              <tr>
                <td>{{avgEvaluation[0]}}</td>
                <td>cost-effectiveness</td>
                <td>{{myEvaluation[0]}}</td>
              </tr>
              <tr>
                <td>{{avgEvaluation[1]}}</td>
                <td>taste</td>
                <td>{{myEvaluation[1]}}</td>
              </tr>
              <tr>
                <td>{{avgEvaluation[2]}}</td>
                <td>filling</td>
                <td>{{myEvaluation[2]}}</td>
              </tr>
              <tr>
                <td>{{avgEvaluation[3]}}</td>
                <td>convenience</td>
                <td>{{myEvaluation[3]}}</td>
              </tr>
              <tr>
                <td>{{avgEvaluation[4]}}</td>
                <td>portability</td>
                <td>{{myEvaluation[4]}}</td>
              </tr>
            </table>
          </div>

        </slot>
        <div class="modal-bottom">
          <div class="instruct">
            Please rate using the 5 metrics in the range 1-5, where 1 is the lowest score and 5 is the highest score.
          </div>
          <table id="evalTable">
            <tr>
              <td></td>
              <td></td>
              <td class="evalRadio">1</td>
              <td class="evalRadio">2</td>
              <td class="evalRadio">3</td>
              <td class="evalRadio">4</td>
              <td class="evalRadio">5</td>
            <tr>
              <td class="evalHead">Cost-effective :</td>
              <td class="evalContent">How beneficial is the product compared to its price?</td>
              <td>
                <input type="radio" value=1 v-model="inputEvaluation[0]">
              </td>
              <td>
                <input type="radio" value=2 v-model="inputEvaluation[0]">
              </td>
              <td>
                <input type="radio" value=3 v-model="inputEvaluation[0]">
              </td>
              <td>
                <input type="radio" value=4 v-model="inputEvaluation[0]">
              </td>
              <td>
                <input type="radio" value=5 v-model="inputEvaluation[0]">
              </td>
            </tr>
            <tr>
              <td class="evalHead">Taste :</td>
              <td class="evalContent">How good is the taste of this product?</td>
              <td>
                <input type="radio" value=1 v-model="inputEvaluation[1]">
              </td>
              <td>
                <input type="radio" value=2 v-model="inputEvaluation[1]">
              </td>
              <td>
                <input type="radio" value=3 v-model="inputEvaluation[1]">
              </td>
              <td>
                <input type="radio" value=4 v-model="inputEvaluation[1]">
              </td>
              <td>
                <input type="radio" value=5 v-model="inputEvaluation[1]">
              </td>
            </tr>
            <tr>
              <td class="evalHead">Filling :</td>
              <td class="evalContent">How much full does it feel after having this product?</td>
              <td>
                <input type="radio" value=1 v-model="inputEvaluation[2]">
              </td>
              <td>
                <input type="radio" value=2 v-model="inputEvaluation[2]">
              </td>
              <td>
                <input type="radio" value=3 v-model="inputEvaluation[2]">
              </td>
              <td>
                <input type="radio" value=4 v-model="inputEvaluation[2]">
              </td>
              <td>
                <input type="radio" value=5 v-model="inputEvaluation[2]">
              </td>
            </tr>
            <tr>
              <td class="evalHead">Convenience :</td>
              <td class="evalContent">How convenient is it to eat this product?</td>
              <td>
                <input type="radio" value=1 v-model="inputEvaluation[3]">
              </td>
              <td>
                <input type="radio" value=2 v-model="inputEvaluation[3]">
              </td>
              <td>
                <input type="radio" value=3 v-model="inputEvaluation[3]">
              </td>
              <td>
                <input type="radio" value=4 v-model="inputEvaluation[3]">
              </td>
              <td>
                <input type="radio" value=5 v-model="inputEvaluation[3]">
              </td>
            </tr>
            <tr>
              <td class="evalHead">Portability :</td>
              <td class="evalContent">How portable is the product to carry around?</td>
              <td>
                <input type="radio" value=1 v-model="inputEvaluation[4]">
              </td>
              <td>
                <input type="radio" value=2 v-model="inputEvaluation[4]">
              </td>
              <td>
                <input type="radio" value=3 v-model="inputEvaluation[4]">
              </td>
              <td>
                <input type="radio" value=4 v-model="inputEvaluation[4]">
              </td>
              <td>
                <input type="radio" value=5 v-model="inputEvaluation[4]">
              </td>
            </tr>
          </table>
          <button v-on:click="createReview" class="submitBtn">
            Submit
          </button>
        </div>



        
       </section>
  <!--     <footer class="modal-footer">
          <slot name="footer">

            <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close me!
            </button>
          </slot>
        </footer> -->
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
    cursor: auto;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 900px;
    height: 700px;
    border-radius: 20px;
  }

  #modalTitle {
    margin: 30px 0px 0px 15px;
    font-size:30px;
    font-weight:bold;
    color: #4AAE9B;
    display:flex;
  }

  #modalWebsite {
    margin-left: 30px;
    color: rgb(148, 148, 148);
    font-size: 21px;
    display: flex;
    width: 440px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .website {
    color: #949494;
  }

  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    padding: 0 15px;
    z-index:11;
    /*justify-content: space-between;*/
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 5px 10px;
    margin-top: -165px;
    z-index: 10;
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

  .closeBtn {
    color: white;
    background: #d83737;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    padding: 2px 6px 2px 7px;
    margin-top: 10px;
    margin-left: 849px;
  }
  .closeBtn:hover {
  background-color: #ce3030;
  color: #f5f5f5;
}

  .closeBtn2 {
    color: white;
    background: #d83737;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    padding: 2px 6px 2px 7px;
    margin-top: 10px;
    margin-left: 414px;
  }
  .closeBtn2:hover {
  background-color: #ce3030;
  color: #f5f5f5;
}

  .thumbnail2 {
    background: black;
    height: 180px;
    width: 180px;
    overflow: hidden;
    margin: -20px 12px 0 0;
    float: right;
    border-radius:12px;
  }


  .numR {
    margin-top: 30px;
    margin-left: 320px;
    font-size: 11px;
    font-weight: thin;
    position: absolute;
  }

  .columnLeft {
    margin-left: 50px;
    float:left;
  }

  .columnRight {
    margin-top: 190px;
    margin-right: 100px;
    float: right;
  }

  .chart {
    width: 400px;
    height: 400px;
  }

  #resultTable {
    text-align:center;
    padding: 5px;
    border-collapse: collapse;
    font-size: 16px;
  }
  #resultTable td {
    padding-top: 10px;
    padding-left:5px;
  }
  #resultTable th {
    padding-left: 10px;
    border-bottom: 0.5px solid #d0d0d0;
  }

  .modal-bottom {
    margin-top: 400px;
    font-size: 16px;
    margin-left: 12px;
  }

  .instruct {
    margin-bottom: 12px;
    margin-left: 60px;
    text-align: left;
  }

  #evalTable {
    border-collapse: collapse;
    margin-left: 130px;
    float:left;
  }
  .evalHead {
    width: 120px;
    text-align: right;
    font-weight: bold;
  }
  .evalContent {
    padding-left: 5px;
    text-align: left;
    width: 375px;
  }
  .evalRadio {
    font-size: 10px;
    text-align: center;
  }
  .ratingValue {
    width: 36px;
    height: 15px;
  }

  .btns {
    outline: none;
    background-color: #48C964;
    color: #fff;
    border-radius: 10px;
    border-width: 0px;
    font-size: 15px;
    padding: 6px 10px 6px 10px;
    cursor: pointer;
  }
  .btns:hover {
    background-color: #2f8542;
  }
  .submitBtn {
    margin-right: 115px;
    margin-top: 5px;
    width: 123px;
    height: 34px;
    float: right;
    outline: none;
    background-color: #48C964;
    color: #fff;
    border-radius: 14px;
    border: 0px;
    font-size: 18px;
    font-weight: bold;
    padding: 6px 13px 6px 13px;
    cursor: pointer;
  }
  .submitBtn:hover {
    background-color: #43be5d;
    color: #f5f5f5;
  }

  .rightBtns {
    float: right;
    width: 180px;
    margin-right: 10px;
    margin-top: -20px;
  }

  .mgpBtn {
    width: 180px;
    height: 45px;
    outline: none;
    background-color: #48C964;
    color: #fff;
    border-radius: 14px;
    border: 0px;
    font-size: 14px;
    font-weight:lighter;
    padding: 6px 13px 6px 13px;
    cursor: pointer;
  }
  .mgpBtn:hover {
    background-color: #43be5d;
    color: #f5f5f5;
  }

</style>