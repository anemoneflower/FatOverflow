<template>
  <div id="app" class="main" style="margin-top: 70px">
    <a class="title" style="margin: auto; text-align: center;">
      Make Group Purchase
    </a>    
    <div class="outer">
      <div class="inner"></div>
    </div>
    <div class=rowDiv>
      <input
        class="titleInput inputBorder"
        v-model="postTitle"
        type="text"
        placeholder="Title"
      />
    </div>
    <div class=rowDiv>
      <input
        class="websiteInput inputBorder"
        v-model="website"
        type="text"
        placeholder="Website"
      />
      <input
        class="dateInput inputBorder"
        v-model="date"
        type="text"
        placeholder="Due date in format YYYY/MM/DD"
      />
    </div>
    <div class="rowDiv">
      <textarea
        class="commentInput inputBorder"
        v-model="note"
      ></textarea>
    </div>
    <div class="rowDiv">
      <button v-on:click="addProduct" class="addBtn btns">
        Add Product +
      </button>
    </div>
    <div class="rowDiv">
      <button v-on:click="createPurchase" class="submitBtn btns">
        Submit
      </button>
    </div> 
  </div>
</template>

<script>
// import { db } from "../main";

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
export default {
  name: "GroupPurchase",
  props: {
    _postId: String,
  },

  data() {
    return {
      postTitle: "Join me",
      website: "www.ocook.com",
      date: "2020/12/21",
      note:"Hi",
    };
  },
  methods: {
    participate: function() {
      console.log("Clicked participate");
    },
    createPurchase: function() {
      // Check validity of input
      if (this.postTitle != "" && this.website != "" && this.date != "") {
        if (this.isValidDate(this.date)) {
          this.submit();
        }
        else {
          console.log("Invalid date format");
        }
      }
      else {
        console.log("Missing content")
      }
      
    },
    submit: function() {
      console.log("create_purchase!");
      console.log(this.postTitle);
      console.log(this.website);
      console.log(this.date);
      // this.note = this.note.replace(/(\r\n|\n|\r)/gm, "<br>");
      console.log(this.note)
      const dueDate = this.date.split("/").join("")
      console.log(dueDate);

      const tmpDate = new Date()
      const day = tmpDate.getDate()
      const month = tmpDate.getMonth() + 1
      const year = tmpDate.getFullYear()
      const currentDate = year.toString() + month.toString() + day.toString()
      console.log(currentDate);

      let createPurchase = {
        createDate: currentDate,
        user_db_key: "unknown_sdd",
        foodList: "unknown",
        title: this.postTitle,
        website: this.website,
        note: this.note,
        userList: "unknown",
        dueDate: this.dueDate
      };
      console.log(createPurchase);

      // To do: put into DB

    },
    isValidDate: function() {
      if (this.date.includes('/')) {
        let tmpDate = this.date.split("/");
        console.log(tmpDate);
        if (tmpDate.length == 3) {
          if ( isInt(tmpDate[0]) 
          && isInt(tmpDate[1]) 
          && isInt(tmpDate[2])
          && parseInt(tmpDate[0]) > 2000
          && parseInt(tmpDate[0]) < 2100
          && parseInt(tmpDate[1]) > 0
          && parseInt(tmpDate[1]) < 13
          && parseInt(tmpDate[2]) > 0
          && parseInt(tmpDate[2]) < 32) {
            return true;
          }
          else {
            return false;
          }
        }
      }
      return false;
    },
    addProduct: function() {
      console.log("Add product");
    }
  }
};


</script>

<style scoped>
.title {
  width: 800px;
  height: 30px;
  margin: auto;
  /* text-align: left;
  margin-bottom: 30px; */
  font-size: 25px;
  font-weight: bold;
  color: #3a3a3a;
}
.inner {
  position: absolute;
  width: 40%;
  height: 100%;
  left: 30%;
  background: #48C964;
  box-shadow: 0px 0px 10px 70px #48C964;
}
.outer {
  width: 300px;
  height: 3px;
  margin: 5px auto 30px;
  /* alignment: left; */
  overflow: hidden;
  position: relative;
  /* background-color: #f37022; */
  outline: none;
}
.rowDiv {
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  margin-top: 20px;
}

.titleInput {
  width: 100%;
  height: 30px;
  outline: none;
}

.inputBorder {
  border-radius: 3px;
  border-color: #cbcbcb;
  border-style: solid;
}

.websiteInput {
  width: 390px;
  height: 30px;
  float: left;
}

.dateInput {
  width: 380px;
  margin-left: 10px;
  height: 30px;
  float: left;
}

.commentInput {
  width: 100%;
  height: 400px;
}

.btns {
  outline: none;
  background-color: #48C964;
  color: #fff;
  border-radius: 10px;
  border-width: 0px;
  font-size: 15px;
  padding: 5px 10px 7px 10px;
  cursor: pointer;
}
.btns:hover {
  background-color: #2f8542;
}

.submitBtn {
  margin: auto;
  width: 100px;
  height: 40px;
}

.addBtn {
  
}

</style>
