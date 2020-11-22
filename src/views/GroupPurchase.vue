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
        <p class="userName">
          by {{gp.userName}}
        </p>
        <p  class="due">
          Due: {{gp.closedDate}}
        </p>
        <div class="hashtag" v-if="(registeredFood.length>0)">
          <div
                  :key = "food.key"
                  v-for="food in registeredFood"
          >
            <Hashtag :food="food"></Hashtag>
          </div>
        </div>
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
<!--          <div>-->
<!--&lt;!&ndash;            <ordered-block>sasdfs</ordered-block>&ndash;&gt;-->

<!--          </div>-->
          <div v-if="Object.keys(participants).length > 0">
            <div class="orderBlock" v-for="(p, key) in participants" v-bind:key="key">
              <div v-for="(pp, key) in p.food" v-bind:key="key">
                <div class="orderLeft">
                  <p class="orderLeftText">{{pp.name}}, {{pp.quantity}}</p>
                </div>
              </div>
              <div>
                <p class="orderRightText">ID: {{p.userName}} </p>
              </div>
            </div>
          </div>
          <div class="orderBlock" v-else>
            There is no participant.
          </div>
      </div>

    </div>
  </div>
</template>

<script>

import {db} from "../main";
import Hashtag from "../components/Hashtag";
import firebase from "firebase";
import store from "../store";

export default {
  name: "GroupPurchase",
  components: {Hashtag},
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
      registeredFood:[],
      participants:{},
      cnt:0
    };
  },
  async mounted() {
    let user =firebase.auth().currentUser;
    let uid = user.uid;
    console.log(uid);
    let query = this.$route.query.GP;
    const snapshot = await db.ref('groupPurchase/'+query).once("value");
    let myValue = snapshot.val();
    this.gp = myValue;
    for (var key in this.gp.registeredFood) {
      console.log(this.gp.registeredFood[key].foodName);
      (this.registeredFood).push(this.gp.registeredFood[key].foodName);
      // console.log(obj[key]);
    }
    this.participants = this.gp.participant;
    console.log("participants is")
    console.log(this.participants)
    // for (var key in this.gp.participant) {
    //
    // }
    console.log(myValue);
  },
  methods: {
    participate: function() {
      console.log("Clicked participate"+this.$route.query.GP);
      var currentUrl = this.$router.history.current["fullPath"];
      console.log(currentUrl);
      store.dispatch("pushRoute", currentUrl);
      this.$router.push("/participate/"+this.$route.query.GP);
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

.userName {
  float: right;
  margin-top: -30px;
  margin-right: 30px;
  font-size: 17px
}

.website {
  text-align: left;
  margin-top: 20px;
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

.hashtag {
  text-align: left;
  margin-top: 3px;
  font-size: 13px;
  margin-left: 3px;
}

.content {
  margin-top: 50px;
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

