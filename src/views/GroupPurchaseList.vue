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
            <select v-model="selected">
                <option v-for="option in options" v-bind:key="option.index">
                    {{ option }}
                </option>
            </select>
        </div>
        <ul class="gpList" v-if="changeOrder.length>0">
            <GPCard
                    v-for="gp in changeOrder"
                    :key = "gp.index"
                    :gp = "gp"
            ></GPCard>
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
<!--            <GPCard></GPCard>-->
        </ul>
        <p style="padding: 80px; font-size:20px" v-else-if = "gpEmpty">
            Loading results...
        </p>
        <p style="padding: 80px; font-size:20px" v-else>
            Nothing left in the list.
        </p>


    </div>
</template>

<script>
import GPCard from "../components/GPCard.vue"
import firebase from "firebase";
// import Dropdown from "../components/Dropdown";

export default {
    components: {
        GPCard
    },
    data(){
        return{
            gpList: [],
            gpEmpty: true,
            selected:'Latest',
            ascending : [],
            descending : [],
            options:[ 'Latest', 'Deadline ascending order', 'Deadline descending order'],
            // selectedList: [gpList, ascending, descending],
            // gp: selectedGp[0]
        };
    },
    async mounted() {
        let user = firebase.auth().currentUser;
        if (user == null) {
        //   alert("Please sign in to go to group purchase.");
          this.$notify({
            group: 'error',
            title: 'Please sign in to go to group purchase.',
            // text: 'Hello user! This is a notification!',
            duration: 5000,
            type: 'error'
          });
          this.$router.push("/");
        }
        let query = this.$route.query.result;
        const snapshot = await firebase.database().ref("/groupPurchase").once("value");
        // this.gpEmpty = false;
        if (query === undefined) {
            // firebase
            //     .database()
            //     .ref("/groupPurchase")
            //     .once("value",snapshot => {
                    let myValue = snapshot.val();
                    if (myValue == null) {
                        this.gpEmpty = true;
                        return;
                    }
                    let keyList = Object.keys(myValue);
                    for(let i = keyList.length; i>0; i--){
                        let myKey = keyList[i-1];
                        let gp = myValue[myKey];
                        gp.key = myKey;
                        console.log("KKKKKKKKKK");
                        console.log(myKey);
                        // this.gpList = [];
                        // this.gpEmpty = false;
                        if(gp.isClosed===false){
                            (this.gpList).push(gp);
                        }
                    }
                // })
        }
        else {
            //TODO: DB wording 바꾸기
            // firebase
            //     .database()
            //     .ref("/groupPurchase")
            //     .once("value",snapshot => {
                    let myValue = snapshot.val();
                    if (myValue == null) {
                        this.gpEmpty = true;
                        return;
                    }
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
                        if(gp.isClosed===false){
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
                    }
                    this.gpEmpty = false;
                    for (let k=0;k<tag.length;k++){
                        (this.gpList).push(tag[k]);
                    }
                    for (let k=0;k<title.length;k++){
                        (this.gpList).push(title[k]);
                    }
                    for (let k=0;k<content.length;k++){
                        (this.gpList).push(content[k]);
                    }
                // })
        }
        if(this.gpList.length>0){
            this.gpEmpty = false;
        }
        else{
            this.gpEmpty = true;
        }
        this.ascending = [...this.gpList];
        this.ascending.sort(function(a, b) {
            return parseInt(a.closedDate) - parseInt(b.closedDate);
        });
        this.descending = [...this.gpList];
        this.descending.sort(function(a, b) {
            return parseInt(b.closedDate) - parseInt(a.closedDate);
        });

        console.log("ASCENDING");
        console.log(this.ascending);
        console.log("DESCENDING");
        console.log(this.descending);
        console.log("LEN" + this.gpList.length);
        console.log(this.selectedList);
        console.log(this.selectedList[this.options.indexOf("Deadline ascending order")]);

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
    },
    computed: {
        changeOrder: function () {
            if (this.selected==this.options[0]){
                return this.gpList
            }
            else if(this.selected==this.options[1]){
                return this.ascending
            }
            else{
                return this.descending
            }
        }
    }
}
</script>
<style scoped>
    .head{
        position: fixed;
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: start;
        left: 50%;
        margin-left: -786px;
        padding-top: 5px;
        z-index:2;
        background-color: #fff;
        width:100%;
        padding-left:300px;
        padding-right:300px;
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

    #mgpbtn{
        height: 40px;
        width: 220px;
        border-radius: 15px;
        background-color: white;
        color: #48C964;
        border: 2px solid #48C964;
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
        margin-left: 480px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    #mgpbtn:hover {
        background-color: #48C964;
        color: white;
    }


    .gpList {
        position: relative;
        padding-top: 80px;
    }
</style>