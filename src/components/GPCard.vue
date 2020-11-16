<template>
    <div class = 'card-post'>
        <div class="square">
            <div class="board-info">
                <a class="entry" >Join me at successdiet!</a>
                <a class="range" :range_text="rangeText">Due: 11. 03. 2020</a>
            </div>
        <div class="representative">
            <div class="title">www.successdiet.com</div>
            <div class="post-info">
                <a class="date">Shipping to: Sarang Building</a>
                <br />
            </div>
        </div>
        <div class="content-box">
            <div class="hashtag">
                <Hashtag></Hashtag>
            </div>
            <Hashtag></Hashtag>
          <!-- <p class="content" v-html=AAAAAAAAAAAa></p> -->
        </div>
        </div>
    </div>
</template>

<script>
import Hashtag from "./Hashtag.vue"
export default {
    components :{
        Hashtag
    }
}
</script>

<style scoped>
.card-post {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: auto;
}
.square {
  width: 800px;
  height: 200px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 20px 50px #d9dbdf;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
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
  padding-top: 20px;
  border-radius: 15px 15px 0px 0px;
  width: 740px;
  position: absolute;
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

.entry {
  float: left;
}

.range {
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

.content {
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
</style>