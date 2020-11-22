<template>
    <div class = 'card-post'>
        <!-- <div class="rowDiv">
          <div class="columnLeft">
              <img class="thumbnail" :src="product.img" style="position: relative;" />
          </div>
          <div class="columnRight">
            s
          </div>
        </div> -->
        <div class="square">
            <div class="columnLeft">
              <img class="thumbnail" :src="product.img" style="position: relative;" />
            </div>
            <div class="board-info columnRight">
                <a class="title" >{{product.title}}</a>
                <!-- <div class="content-box">
                    <div class="hashtag">
                        <Hashtag></Hashtag>
                    </div>
                    <div class="hashtag">
                        <Hashtag></Hashtag>
                    </div>
                </div> -->
            </div>
        <div class="representative">
            <div class="site">{{product.website}}</div>
        </div>

        </div>
        <!-- <button class="removeButton" v-on:click="removeProduct">
          remove
        </button> -->
    </div>
</template>

<script>
// import Hashtag from "./Hashtag.vue"
export default {
    components :{
        // Hashtag
    },
    props: {
        product : {
            type: Object
        },
        productKey: String,
    },
    methods: {
      removeProduct() {
        console.log("Call remove product");
      }
    }
}
</script>

<style scoped>
.card-post {
  display: relative;
  justify-content: center;
  padding: 10px;
  margin: auto;
}
.square {
  width: 565px;
  height: 100px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 20px 50px #d9dbdf;
  float: left;
}
/* .square:hover {
  -webkit-transform: translate(20px, -10px);
  -ms-transform: translate(10px, -10px);
  transform: translate(10px, -10px);
  -webkit-box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
} */
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
  padding-top: 20px;
  border-radius: 15px 15px 0px 0px;
  width: 740px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  background-color: #ffffff;
  /* border-style: solid; */
}
.board-info > a {
  font-size: 25px;
  color: rgb(0, 0, 0);
}
.site {
  float: left;
}
.cDate {
  float: right;
  font-size: 15px;
}
.representative {
  margin: auto;
  width: 740px;
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
  font-size: 15px;
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
  font-size: 20px;
  width: 500px;
  color: #9D9D9D;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.content-box {
  width: 740px;
  padding-left: 30px;
  padding-right: 30px;
  margin: auto;
  margin-top: 130px;
  position: absolute;
  display: grid;
  grid-template-columns: auto auto;
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
    margin-right: 1px;
}
.thumbnail {
    background: black;
    height: 80px;
    width: 80px;
    overflow: hidden;
    margin: 9px 0 0 10px;
    border-radius: 5px;
}
.rowDiv {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.columnLeft {
  float: left;
  width: 100px;
}
.columnRight {
  float: left;
  width: 300px;
  padding-left: 10px;
  padding-top: 30px;
}
.removeButton {
  background: red;
  color: white;
  height: 30px;
}
</style>