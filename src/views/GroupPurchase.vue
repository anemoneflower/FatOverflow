<template>
  <div class="main" style="margin-top: 150px">
    <div class="row">
      <div class="column_left">
        <p class="postTitle">
          {{ gp.title }}
        </p>
        <p class="website">
          {{gp.website}}
        </p>
        <p  class="due">
          Due: {{gp.closedDate}}
        </p>
        <p class="content">
          {{gp.content}}
        </p>
      </div>
      <div class="column_right">
        <button 
          class="participateButton"
          v-on:click="participate"
        >Participate +</button>
          <p class="currentOrderTitle">
            Currently Collected Orders
          </p>
          <div>
            <ordered-block>sasdfs</ordered-block>

          </div>
          <div class="orderBlock">
            
            <div class="orderLeft">
              <p class="orderLeftText">aadfasdf</p>
            </div>
            <div>
              <p class="orderRightText">ID: ss </p>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>

import {db} from "../main";

export default {
  name: "GroupPurchase",
  props: {
    _postId: String,
  },
  data() {
    return {
      // postTitle: "Ocook Chicken Breast Group Purchase",
      // website: "http://www.ocook.com",
      // date: "11. 05. 2020",
      // content:"I am looking for people who are willing to buy lunch boxes and meal plans from this website. The products that slimcook provides are very calori-friendly and always come with fresh ingredients, so I guarantee that you will enjoy them as much as I do.\n\nAs this website requires at least 10 items for free shipping, I will wit untiol we have at least 10 items to order together.",
      // postKey: "-MMPFFDBm2EZw2-Wuwob"
      gp:"",
    };
  },
  async mounted() {
    let query = this.$route.query.GP;
    const snapshot = await db.ref('groupPurchase/'+query).once("value");
    let myValue = snapshot.val();
    this.gp = myValue;
    console.log(myValue);
  },
  methods: {
    participate: function() {
      console.log("Clicked participate");
      this.$router.push("/participate/"+this.postKey);
    },

  }
};


</script>

<style scoped>


.column_left {
  float: left;
  width: 38%;
  margin-left: 12%;
  min-width: 500px;
}

.column_right {
  float: right;
  width: 33%;
  padding-left: 80px;
  margin-right: 10%;
  min-width: 300px;
}

.participateButton {
  background-color: #48C964; /* Green */
  border: none;
  color: white;
  padding: 6px 13px 6px 13px;
  text-align: center center;
  text-decoration: none;
  display: inline-block;
  border-radius: 14px;
  font-size: 13px;
  margin: 5px 2px;
  cursor: pointer;
  float: right;
  margin-right: 50px;
  outline: none;
}

.participateButton:hover {
  background-color: #2f8542;
}



p {
  margin: auto;
}

input[type="text"],
textarea {
  border-style: inset;
  border-width: 2px;
}

.postTitle {
  text-align: left;
  font-size: 25px;
  font-weight: bold;
}

.currentOrderTitle {
  margin-top: 40px;
  text-align: center;
  font-size: 18px;
}

.website {
  text-align: left;
  margin-top: 10px;
  margin-left: 8px;
  font-size: 13px;
  color: #9D9D9D
}

.due {
  margin-top: 5px;
  margin-left: 8px;
  font-size: 15px;
  text-align: left;
}

.content {
  margin-top: 20px;
  margin-left: 5px;
  text-align: left;
  font-size: 16px;
  white-space: pre-line;
}

.orderBlock {
  border-style: solid;
  border-color: #C4C4C4;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 15px;
  padding: 13px 9px 13px 9px;
  width: 378px;
  float: right;
  margin-right: 50px;
}

.orderLeft {
  width: 60%;
  float: left;
}

.orderLeftText {
  text-align: left;
  font-weight: bold;
  margin-left: 15px;
}

.orderRightText {
  text-align: right;
  margin-right: 20px;
}

.row {
  position: absolute;
  min-width: 1300px;
  margin-top: -75px;
}
</style>

