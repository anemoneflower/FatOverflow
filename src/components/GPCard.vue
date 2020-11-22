<template>
    <div class = 'card-post'>
        <div class="square">
            <div class="board-info">
                <a class="title" >{{gp.title}}</a>
                <a class="cDate">Due: {{expressDate(gp.closedDate)}}</a>
            </div>
        <div class="representative">
            <div class="site">{{gp.website}}</div>
            <div class="post-info">
                <a class="shipping">Shipping to: {{gp.shipping}}</a>
                <br />
            </div>
        </div>
        <div class="content-box">
            <div class="hashtag" v-if="registeredFood.length">
                <div
                        :key = "food.key"
                        v-for="food in registeredFood"
                >
                    <Hashtag :food="food"></Hashtag>
                </div>
            </div>
            <div class="review" v-if="(gp.review!==undefined)&&(gp.review)===true">
                <button>Add review</button>
            </div>
            <div class="review" v-else-if="(gp.review!==undefined)&&(gp.review===false)">
                <button>Your review</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Hashtag from "./Hashtag.vue"
export default {
    components :{
        Hashtag
    },
    props: {
        gp : {
            type: Object
        }
    },
    data(){
        return{
          registeredFood: [],
            review : (this.gp.review!==undefined)&&(this.gp.review)
        };
    },
    mounted() {
        console.log("GPREVIEW"+this.gp.review);
        for (var key in this.gp.registeredFood) {
            console.log(this.gp.registeredFood[key].foodName);
            (this.registeredFood).push(this.gp.registeredFood[key].foodName);
        }
    },
    methods: {
      expressDate(num) {
        return num.slice(0,4) + ". " + num.slice(4,6) + ". " + num.slice(6);
      }
    }
}
</script>

<style scoped>
.card-post {
  width: 1200px;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: auto;
}
.square {
  width: 1200px;
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
  width: 1140px;
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
  width: 1140px;
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

.content-box {
  width: 740px;
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

</style>
