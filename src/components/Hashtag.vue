<template>
    <div>
      <div
        class="hashtag2"
        @click="showReview = !showReview;"
      >
        {{food.foodName}}
      </div>
      <ViewReview 
        v-if="showReview && enableClick"
        :foodName="foodName"
        :imgUrl="img"
        :website="website"
        @close="showReview = !showReview"
        :foodKey="foodKey"
        :fromTag="true"
      />
    </div>
</template>

<script>
import ViewReview from "../views/ViewReview"
import { db } from "../main"
export default {
    props:{
        food: {
          type: Object
        },
        enableClick: {
          type: Boolean,
          default: false
        }
    },
    components: {
      ViewReview
    },
    data() {
      return {
        showReview: false,
        foodName: "",
        img: "",
        website: "",
        foodKey: ""
      }
    },
    async mounted() {
      // this.uid = firebase.auth().currentUser.uid;
      console.log("Mounted wait for foodkey" + this.food.key)
      console.log(this.food.key)
      console.log(this.food)
      const snapshot = await db.ref("food").child(this.food.key).once("value");
      // const snapshot = await db.ref('users/SVsXvyMLsbUOnof9iAcUy390WZB3').once("value");
      console.log("read done")
      // console.log(snapshot.val())
      const myValue = snapshot.val() && snapshot.val()
      this.foodName = myValue.foodName
      this.img = myValue.img
      this.website = myValue.website
      this.foodKey = this.food.key
    }
    // method: {
    //   changeShowReview() {
    //     console.log("ChangeShowReview called")
    //     this.showReview = !this.showReview
    //   }
    // }
}
</script>

<style scoped>
    .hashtag2 {
        float: left;
        border-radius: 30px;
        border-style: solid;
        border-width: 1px;
        border-color: #48C964;
        color: #48C964;
        background-color: #fff;
        padding : 3px 12px 3px 12px;
        font-size: 15px;
        margin-right: 8px;
        margin-top: 5px;
        /*height: 30px;*/
    }
</style>