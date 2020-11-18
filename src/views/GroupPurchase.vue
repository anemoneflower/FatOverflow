<template>
  <div class="main" style="margin-top: 150px">
    postId: {{ _postId }}
    <div class="row">
      <div class="column_left">
        <p class="postTitle">
          {{ postTitle }}
        </p>
        <p class="website">
          {{website}}
        </p>
        <p  class="due">
          Due: {{date}}
        </p>
        <p class="content">
          {{content}}
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

export default {
  name: "GroupPurchase",
  props: {
    _postId: String,
  },
  data() {
    return {
      postTitle: "Ocook Chicken Breast Group Purchase",
      website: "http://www.ocook.com",
      date: "11. 05. 2020",
      content:"I am looking for people who are willing to buy lunch boxes and meal plans from this website. The products that slimcook provides are very calori-friendly and always come with fresh ingredients, so I guarantee that you will enjoy them as much as I do.\n\nAs this website requires at least 10 items for free shipping, I will wit untiol we have at least 10 items to order together.",
    };
  },
  methods: {
    participate: function() {
      console.log("Clicked participate");
    },

  }
};


</script>

<style scoped>

.column_left {
  float: left;
  width: 55%;
}

.column_right {
  float: left;
  width: 35%;
  padding-left: 80px;
}

.participateButton {
  background-color: #48C964; /* Green */
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
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
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
}

.website {
  text-align: left;
  color: #9D9D9D
}

.due {
  text-align: left;
}

.content {
  text-align: left;
  white-space: pre-line;
}

.orderBlock {
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
}

.orderLeft {
  width: 60%;
  float: left;
}

.orderLeftText {
  text-align: left;
  font-weight: bold;
}

.orderRightText {
  text-align: left
}

</style>
