<template>
    <div class = 'card-post'>
        <div class="square" @click.self="goGp()">
            <div class="board-info" @click.self="goGp()">
                <a class="title" >{{gp.title}} <a v-if="(this.opened===true)||(gp.opened===true)" class="owner">Owner</a></a>
                <div class="closeTag" v-if="(gp.isClosed!==undefined)&&(gp.isClosed===true)" @click.self="goGp()">
<!--                    <button class="cbtn">Closed</button>-->
                    <a>CLOSED</a>
                </div>
                <div class="cDate" v-else>
                    <a class="cDate" >Due: {{expressDate(gp.closedDate)}}</a>
                </div>
            </div>
            <div class="representative" @click.self="goGp()">
                <div class="site">{{gp.website}}</div>
                <div class="post-info">
                    <a class="shipping">Shipping to: {{gp.shipping}}</a>
                    <br />
                </div>
            </div>
            <div class="content-box" @click.self="goGp()">
                <div class="hashtag" v-if="(registeredFood.length>0)&&(gp.participate===true)" @click.self="goGp()">
                    <div
                            :key = "key"
                            v-for="(food, key, index) in gp.food"
                    >
                        <PurchaseTag :food="food" v-if="index<2"></PurchaseTag>
                        <PurchaseTag :food="overflow1" v-else-if="index===3"></PurchaseTag>
                    </div>
                </div>
                <div class="hashtag" v-else-if="(registeredFood.length>0)" @click.self="goGp()">
                    <div
                            :key = "food.key"
                            v-for="(food, index) in registeredFood"
                    >
                        <Hashtag :food="food" v-if="index<2"></Hashtag>
                        <Hashtag :food="overflow2" v-else-if="index===3"></Hashtag>
                    </div>
                </div>
<!--                <div class="review" v-if="(gp.review!==undefined)&&(gp.review===true)">-->
<!--                    <button class="btns">Add review</button>-->
<!--                </div>-->
<!--                <div class="review" v-else-if="(gp.review!==undefined)&&(gp.review===false)">-->
<!--                    <button class="btns">Your review</button>-->
<!--                </div>-->
                <div class="closebtn" v-if="(gp.isClosed!==undefined)&&(gp.isClosed===false)&&(gp.opened===true)">
                    <button class="btns" @click="closePost()">Close Post</button>
                </div>
                <div class="participatebtn" v-if="(gp.isClosed===false)&&((gp.participate===true)||(gp.opened===true))">
                    <button class="btns" @click="goChat()">Go Chat</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Hashtag from "./Hashtag.vue"
import PurchaseTag from "./PurchaseTag.vue"
import firebase from "firebase";

export default {
    components :{
        Hashtag,
        PurchaseTag
    },
    props: {
        gp : {
            type: Object
        },
        gpKey: String,
        // registeredFoodKey: String
    },
    data(){
        return {
            registeredFood: [],
            overflow1: {
                quantity: "More...",
                name: ""

            },
            overflow2: {
                foodName: "More... "
            },
            opened: false
        };
    },
    async mounted() {
        if(this.gp.opened===undefined){
            if (firebase.auth().currentUser == null) {
              return;
            }
            let userKey = firebase.auth().currentUser.uid;
            const snapshot = await firebase.database().ref('groupPurchase/'+this.gp.key+'/userKey').once("value")
            var myValue = snapshot.val();
            if(myValue===userKey){
                this.opened = true;
            }
            else{
                this.opened = false;
            }
        }


        for (var key in this.gp.registeredFood) {
            console.log(this.gp.registeredFood[key].foodName);
            let rf = this.gp.registeredFood[key];
            rf.key = key;
            (this.registeredFood).push(rf);
        }
        console.log('registeredFood');
        console.log(this.registeredFood);

    },
    methods: {
        expressDate(num) {
            return num.slice(0, 4) + ". " + num.slice(4, 6) + ". " + num.slice(6);
        },
        goChat() {
            //TODO: close 하기
            //   this.$router.push({path:'',query:{GP:this.gp.key}});
            console.log("closepost");
            console.log(this.gp.key);
            this.$router.push("/chat/" + this.gp.key);
        },
        goGp() {
            console.log(this.gp.key);
            this.$router.push({path: '/gp', query: {GP: this.gp.key}});
        },
        closePost() {
            if (firebase.auth().currentUser === null) {
              return;
            }
            let userKey = firebase.auth().currentUser.uid;
            let ref = firebase.database().ref("groupPurchase/" + this.gp.key);
            ref.update({
                isClosed: true
            })
            let userref = firebase.database().ref("/users/" + userKey + "/gpList/" + this.gp.key);
            userref.update({
                closed: true
            })

            this.$router.push("/mypage/closed");
            window.location.reload();
            // let ref = db.ref("/users")
        }
    }
}
</script>

<style scoped>
.card-post {
  width: 1000px;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: auto;
}
.square {
  width: 1000px;
  height: 180px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 20px 50px #d9dbdf;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
}

.square:hover {
  -webkit-transform: translate(20px, -10px);
  -ms-transform: translate(10px, -10px);
  transform: translate(10px, -10px);
  -webkit-box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
a:visited {
  text-decoration: none;
  color: #3a3a3a;
}

a:link {
  text-decoration: none;
  color: #3a3a3a;
}
.board-info {
  margin: auto;
  padding-top: 30px;
  border-radius: 15px 15px 0px 0px;
  width: 940px;
  position: absolute;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  background-color: #ffffff;
  /* border-style: solid; */
}

.board-info > a {
  color: rgb(0, 0, 0);
}

.site {
  float: left;
  font-size: 17px;
  color: #cbcbcb;
  margin-left: 5px;
}

.cDate {
  float: right;
  font-size: 23px;
}

.representative {
  margin: auto;
  width: 940px;
  margin-top: 70px;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
}

.post-info {
  float: right;
  position: relative;
}

.status {
  float: right;
  position: relative;
}

.post-info > a {
  font-size: 18px;
  color: #cbcbcb;
}

#eye {
  position: relative;
  top: 3.5px;
  height: 16.8px;
  right: 10px;
}

#thumbs {
  position: relative;
  top: 2.3px;
  height: 15px;
  right: 3px;
}

.title {
  float: left;
  text-align: left;
  font-size: 25px;
  width: 500px;
  color: #9D9D9D;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.owner{
    margin-left: 7px;
    margin-top: 10px;
    border-radius: 30px;
    border-style: solid;
    border-width: 1px;
    border-color: #fff;
    color: #fff;
    background-color: #48C964;
    padding : 1px 10px 1px 10px;
    font-size: 13px;
}

/*.hashtag {*/
/*    float: left;*/
/*    border-radius: 30px;*/
/*    border-style: solid;*/
/*    border-width: 1px;*/
/*    border-color: #48C964;*/
/*    color: #48C964;*/
/*    background-color: #fff;*/
/*    padding : 3px 12px 3px 12px;*/
/*    font-size: 15px;*/
/*    margin-right: 15px;*/
/*    !*height: 30px;*!*/
/*}*/

.content-box {
  width: 943px;
  padding-left: 35px;
  padding-right: 30px;
  margin: auto;
  margin-top: 130px;
  position: absolute;
/*  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(1,18px); */
  justify-content: start;
}

.shipping {
  text-align: justify;
  font-size: 15px;
  color: #cbcbcb;
  line-height: 20px;
  margin-bottom: 8px;
  max-height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.author {
  float: left;
  text-align: justify;
  font-size: 15px;
  text-decoration: none;
  color: #3a3a3a;
}

.hashtag {
  margin-left: -7px;
}

.btns {
  outline: none;
  background-color: #48C964;
  color: #fff;
  border-radius: 10px;
  border-width: 0px;
  font-size: 15px;
  padding: 6px 11px 6px 11px;
  margin-right: 7px;
  cursor: pointer;
  float:right;
}
.btns:hover {
  background-color: #43be5d;
  color: #f5f5f5;
}

.cbtn{
    background-color: #c4c4c4;
    border: none;
    color: white;
    padding: 6px 16px 6px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    float: right;
    outline: none;
}

.closeTag {
  /*position: absolute;*/
  /*z-index: 1;*/
  font-weight: bold;
  font-size: 23px;
    color: #d91e1e;
    float: right;
}
</style>
