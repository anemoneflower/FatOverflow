<template>
    <div>
        <div class="head">
            <div class = "gpbtn">
                <button id="gpbtn">Group Purchase</button>
            </div>
            <div class = "reviewbtn">
                 <button id="reviewbtn" @click="goProducts()">Products</button>
            </div>
            <div class = "mgp">
                 <button id="mgpbtn" @click="goMgp()">Make Group Purchase</button>
            </div>
        </div>

        <ul class="gpList" v-if="gpList.length>0">
            <GPCard
                    v-for="gp in gpList"
                    :key = "gp.index"
                    :gp = "gp"
            ></GPCard>
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
        </ul>
        <p v-else>
            Nothing left in the list.
            Nothing left in the list.
        </p>
    </div>
</template>

<script>
import GPCard from "../components/GPCard.vue"
import firebase from "firebase";

export default {
    components: {
        GPCard
    },
    data(){
        return{
            gpList: []
            // gp: selectedGp[0]
        };
    },
    mounted() {
        let query = this.$route.query.result;
        if (query === undefined) {
            firebase
                .database()
                .ref("/groupPurchase")
                .once("value",snapshot => {
                    let myValue = snapshot.val();
                    let keyList = Object.keys(myValue);
                    for(let i = keyList.length; i>0; i--){
                        let myKey = keyList[i-1];
                        let gp = myValue[myKey];
                        gp.key = myKey;
                        console.log("KKKKKKKKKK");
                        console.log(myKey);
                        (this.gpList).push(gp);
                    }
                })
        }
        else {
            //TODO: DB wording 바꾸기
            firebase
                .database()
                .ref("/groupPurchase")
                .once("value",snapshot => {
                    let myValue = snapshot.val();
                    let keyList = Object.keys(myValue);
                    let title = [];
                    let tag = [];
                    let content = [];
                    for(let i = keyList.length; i>0; i--){
                        let myKey = keyList[i-1];
                        let gp = myValue[myKey];

                        let registeredFood = gp.registeredFood;
                        let foodList = Object.keys(registeredFood);
                        let count = 0;
                        for(let j = 0; j<foodList.length; j++){
                            let foodKey = foodList[j];
                            let f = registeredFood[foodKey];
                            if(f.foodName.toLowerCase().includes(query.toLowerCase())){
                                count++
                            }
                        }
                        gp.key = myKey;
                        if(count>0){
                            tag.push(gp);
                        }
                        else if (gp.title.toLowerCase().includes(query.toLowerCase())){
                            title.push(gp);
                        }
                        else if (gp.content.toLowerCase().includes(query.toLowerCase())){
                            content.push(gp);
                        }
                    }
                    for (let k=0;k<tag.length;k++){
                        (this.gpList).push(tag[k]);
                    }
                    for (let k=0;k<title.length;k++){
                        (this.gpList).push(title[k]);
                    }
                    for (let k=0;k<content.length;k++){
                        (this.gpList).push(content[k]);
                    }
                })
        }
        console.log("LEN" + this.gpList.length);

    },
    methods: {
        goProducts() {
            let query = this.$route.query.result;
            if (query === undefined){
                this.$router.push({path:'/products'});
            }
            else {
                this.$router.push({path:'/products',query:{result:query}});
            }
        },
        goMgp() {
          this.$router.push({path:'/mgp'});
        }
    }
}
</script>
<style scoped>
    .head{
        position: fixed;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
        padding-left: 12%;
        padding-top: 5px;
        z-index:1;
        background-color: #fff;
        width:100%;
    }
    #gpbtn {
        height: 40px;
        width: 150px;
        border-radius: 15px;
        background-color: #48C964;
        color: white;
        border: 0px;
        font-size: 18px;
        margin-top: 10px;
        margin-right: 15px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    #gpbtn:hover {
        background-color: #43be5d;
        color: #f5f5f5;
    }
    #reviewbtn{
        height: 40px;
        width: 150px;
        border-radius: 15px;
        background-color: #adf5bc;
        color: #8B8B8B;
        border: 0px;
        font-size: 18px;
        margin-top: 10px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    #reviewbtn:hover {
        background-color: #99e5aa;
        color: #818181;
    }


    #mgpbtn {
      float: right
    }

    .gpList {
        position: relative;
        padding-top: 80px;
    }
</style>