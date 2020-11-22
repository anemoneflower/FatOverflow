<script>
  import { db } from "../main";
  import CreateReview from "../components/CreateReview"
  export default {
    name: 'modal',
    props: {
      userId: {
        type: String,
        default: "unknown_user_id"
      },
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
      }
    },
    components: {
      CreateReview
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
      }
    },
    data() {
      return {
        myEvaluation: [1,2,1,1,1],
        avgEvaluation: [3,3,3,3,3]
      }
    },
    async mounted() {
      console.log("Mounted wait for foodkey" + this.foodKey)
      const snapshot = await db.ref("review").once("value");
      // const snapshot = await db.ref('users/SVsXvyMLsbUOnof9iAcUy390WZB3').once("value");
      console.log("mount done")
      // console.log(snapshot.val())
      const myValue = snapshot.val() && snapshot.val()
      let evalArr = [0, 0, 0, 0, 0]
      let count = 0
      for (const key in myValue) {
        console.log(myValue[key]);
        if (myValue[key].foodKey == this.foodKey) {
          evalArr[0] = evalArr[0] + myValue[key].evaluation[0];
          evalArr[1] = evalArr[1] + myValue[key].evaluation[1];
          evalArr[2] = evalArr[2] + myValue[key].evaluation[2];
          evalArr[3] = evalArr[3] + myValue[key].evaluation[3];
          evalArr[4] = evalArr[4] + myValue[key].evaluation[4];
          count = count + 1;
        }
      }
      console.log(myValue);
    }
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h1>Review for {{foodName}}</h1>
          <img class="thumbnail" :src="getImage(imgUrl)" style="position: relative;" />
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
        <CreateReview></CreateReview>
        <slot name="body">
          <div class="columnLeft">
            <p>My evaluation</p>
            cost-effectiveness: {{myEvaluation[0]}}
            taste: {{myEvaluation[1]}}
            filling: {{myEvaluation[2]}}
            convenience: {{myEvaluation[3]}}
            undecided: {{myEvaluation[4]}}
          </div>
          <div>
            <p>Average evaluation</p>
            cost-effectiveness: {{avgEvaluation[0]}}
            taste: {{avgEvaluation[1]}}
            filling: {{avgEvaluation[2]}}
            convenience: {{avgEvaluation[3]}}
            undecided: {{avgEvaluation[4]}}
          </div>

        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">

            <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close me!
          </button>
        </slot>
      </footer>
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
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 300;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
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

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .thumbnail {
    background: black;
    height: 150px;
    width: 150px;
    overflow: hidden;
    display: block;
  }

  .columnLeft {
    width: 100%;
  }


</style>