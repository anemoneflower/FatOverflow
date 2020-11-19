<template>
    <div>
        <div class="head">
            <div class = "gpbtn">
                <button id="gpbtn">Group Purchase</button>
            </div>
            <div class = "reviewbtn">
                 <button id="reviewbtn">Reviews</button>
            </div>
        </div>
        <ul class="gpList" v-if="gpList.length">
            <GPCard
                    v-for="gp in gpList"
                    :key = "gp in gpList"
                    :gp = "gp"
                    :gpKey = "gpKey"
            ></GPCard>
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
        </ul>
        <p v-else>
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
        firebase
        .database()
        .ref("/groupPurchase")
        .once("value",snapshot => {
            var myValue = snapshot.val();
            var keyList = Object.keys(myValue);
            for(var i = keyList.length; i>0; i--){
                var myKey = keyList[i-1];
                var gp = myValue[myKey];
                (this.gpList).push(gp);
            }
        })
    }
}
</script>
<style scoped>
    .head{
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
        margin-left: 50px;
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
        margin-right: 5px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
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
    .gpList {
        position: relative;
        padding-top: 20px;
    }
</style>