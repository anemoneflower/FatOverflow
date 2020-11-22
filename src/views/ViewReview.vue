<script>
  import { db } from "../main";
  export default {
    name: 'modal',
    props: {
      userId: {
        type: String,
        default: "unknown_user_id"
      },
      // foodName: {
      //   type: String,
      //   default: "unknown food name"
      // },
      foodKey: {
        type: String,
        default: "unknown key"
      },
      // imgUrl: {
      //   type: String,
      //   default: "unknown image url"
      // }
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
        foodName: "",
        imgUrl: "",
        evaluation: [1,2,1,1,1]
      }
    },
    async mounted() {
      console.log("Mounted wait for foodkey" + this.foodKey)
      const snapshot = await db.ref("food/"+this.foodKey).once("value");
      // const snapshot = await db.ref('users/SVsXvyMLsbUOnof9iAcUy390WZB3').once("value");
      console.log("mount done")
      // console.log(snapshot.val())
      const myValue = snapshot.val() && snapshot.val()
      this.foodName = myValue.foodName
      this.imgUrl = myValue.imgUrl
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
        <slot name="body">
          <p>cost-effectiveness: {{evaluation[0]}}</p>
          <p>taste: {{evaluation[1]}}</p>
          <p>filling: {{evaluation[0]}}</p>
          <p>convenience: {{evaluation[0]}}</p>
          <p>undecided: {{evaluation[0]}}</p>

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
</style>