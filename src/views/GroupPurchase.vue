<template>
  <div class="main" style="margin-top: 150px">
    <div class="row2">
      <div class="column_left">
        <p class="postTitle">
          {{ gp.title }}
        </p>
        <p class="userName">
          by {{gp.userName}}
        </p>
        <p  class="due">
          Due: {{gp.closedDate.slice(0, 4)}}. {{gp.closedDate.slice(4, 6)}}. {{gp.closedDate.slice(6, 8)}}
        </p>
        <div style="width: 550px">
          <div class="hashtag" v-if="(registeredFood.length>0)">
            <div
                    :key = "food.key"
                    v-for="food in registeredFood"
            >
              <Hashtag :food="food" enableClick="true"></Hashtag>
            </div>
          </div>
        </div>
        <div style="width: 550px; display:flex;">
          <a class="website" v-bind:href="gplink" target="_blank">
            {{gp.website}}
          </a>
        </div>
        <div style="width:550px; display:flex;">
          <p class="content">
            {{gp.content}}
          </p>
        </div>

      </div>
      <div class="column_right">
        <button
          class="participateButton"
          v-on:click="participate"
          v-if="(gp.isClosed===false)&&(this.isUser===false)"
        >Participate +</button>
        <button
                class="closedButton"
                v-else-if="(gp.isClosed===true)"
                disabled
        >Closed</button>
        <a v-else> </a>
          <p class="currentOrderTitle">
            Currently Collected Orders
          </p>
<!--          <div>-->
<!--&lt;!&ndash;            <ordered-block>sasdfs</ordered-block>&ndash;&gt;-->

<!--          </div>-->
          <div v-if="participants != null">
          <div class="paBlock"
            v-for="(p, key) in participants" v-bind:key="key"
          >
            <div class="orderBlock" v-for="(pp, key) in p.food" v-bind:key="key">
              <div>
                <div class="orderLeft">
                  <p class="orderLeftText">{{pp.name}}, {{pp.quantity}}</p>
                  <p class="orderRightText">by {{p.userName}} </p>
                </div>
              </div>
            <div>
              </div>
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
      gplink:"",
      registeredFood:[],
      participants:{},
      cnt:0,
      isUser:false
    };
  },
  async mounted() {
    let user =firebase.auth().currentUser;

    if(user === null){
      var currentUrl = this.$router.history.current["fullPath"];
      console.log(currentUrl);
      await store.dispatch("pushRoute", currentUrl);
      await this.$router.push("/sign-in");
    }
    let uid = user.uid;


    console.log(uid);
    let query = this.$route.query.GP;
    const snapshot = await db.ref('groupPurchase/'+query).once("value");
    let myValue = snapshot.val();
    this.gp = myValue;
    for (var key in this.gp.registeredFood) {
      // console.log(this.gp.registeredFood[key].foodName);
      let rf = this.gp.registeredFood[key]
      rf.key = key;
      this.registeredFood.push(rf);
      // console.log(obj[key]);
    }
    this.participants = this.gp.participant;
    console.log("participants is")
    console.log(this.participants)
    // for (var key in this.gp.participant) {
    //
    // }
    console.log(this.gp.website);
    if((this.gp.website.slice(0, 8) !== "https://") && (this.gp.website.slice(0, 7) !== "http://")){
      this.gplink = "https://"+this.gp.website
    }else{
      this.gplink = this.gp.website
    }

    if(this.gp.userKey===uid){
      this.isUser = true;
    }
    console.log(myValue);
  },
  methods: {
    participate: function() {
      console.log("Clicked participate"+this.$route.query.GP);
      var currentUrl = this.$router.history.current["fullPath"];
      console.log(currentUrl);
      store.dispatch("pushRoute", currentUrl);
      if(firebase.auth().currentUser === null){
        this.$router.push("/sign-in");
      }
      else{
        this.$router.push("/participate/"+this.$route.query.GP);
      }
    },

  }
};


</script>

<style scoped>


.column_left {
  float: left;
  width: 550px;
  min-width: 500px;
}

.column_right {
  float: left;
  width: 550px;
  padding-left: 20px;
  min-width: 300px;
}

.participateButton {
  background-color: white; /* Green */
  border: 2px solid #48C964;
  color: #48C964;
  padding: 6px 13px 6px 13px;
  text-align: center center;
  text-decoration: none;
  display: inline-block;
  border-radius: 14px;
  font-size: 18px;
  font-weight: bold;
  margin: -15px 2px 0 2px;
  cursor: pointer;
  float: right;
  margin-right: 50px;
  outline: none;
}

.participateButton:hover {
  background-color: #48C964;
  color: white;
}

.closedButton {
  background-color: #636b6f; /* Green */
  border: none;
  color: white;
  padding: 6px 13px 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 14px;
  font-size: 20px;
  margin: -15px 2px 0 2px;
  float: right;
  margin-right: 50px;
  outline: none;
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
  word-break:break-all;
}

.currentOrderTitle {
  margin-top: 40px;
  text-align: center;
  font-size: 18px;
  word-break:break-all;
}

.userName {
  float: right;
  margin-top: -30px;
  margin-right: 30px;
  font-size: 17px;
  word-break:break-all;
}

.website {
  text-align: left;
  margin-top: 10px;
  margin-left: 8px;
  font-size: 15px;
  color: #9D9D9D;
  word-break:break-all;
  width: 500px;
}

.due {
  margin-top: 10px;
  margin-left: 8px;
  font-size: 15px;
  text-align: left;
  word-break:break-all;
}

.hashtag {
  text-align: left;
  margin-top: 3px;
  font-size: 13px;
  margin-left: 3px;
  cursor: pointer;
}

.content {
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
  text-align: left;
  font-size: 16px;
  white-space: pre-line;
  word-break:break-all;
}

.orderBlock {
  border-style: solid;
  border-color: #C4C4C4;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 15px;
  padding: 13px 9px 13px 9px;
  width: 400px;
  float: right;
  margin-right: 50px;
}

.orderLeft {
  width: 100%;
  float: left;
}

.orderLeftText {
  text-align: left;
  font-weight: bold;
  margin-left: 15px;
  width: 55%;
  float: left;
}

.orderRightText {
  text-align: right;
  margin-right: 6px;
  width: 37%;
  float:right;
}

.row2 {
  position: absolute;
  min-width: 1120px;
  margin-top: -75px;
  left: 50%;
  margin-left: -560px;
}

.paBlock {
  max-height: 400px;
  overflow-y: scroll;
}
.paBlock::-webkit-scrollbar {
  width: 12px;
}
.paBlock::-webkit-scrollbar-thumb {
    background-color: none;
    border-radius: 6px;
}
.paBlock:hover::-webkit-scrollbar-thumb {
    background: #dadada;
}
.paBlock::-webkit-scrollbar-track {
    background-color: none;
}
</style>

