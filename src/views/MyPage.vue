<template>
    <div>
        <div class="head">
            <div class="btn">
                <router-link tag="button" @click.native="enableParticipate()" to="/mypage/participate">Participating</router-link>
                <router-link tag="button" @click.native="enableOpened()" to="/mypage/opened">Opened</router-link>
                <router-link tag="button" @click.native="enableClosed()" to="/mypage/closed">Closed</router-link>
            </div>
        </div>
        <ul class="gpList" v-if="gpList.length">
            <GPCard
                    v-for="gp in gpList"
                    :key = "gp.index"
                    :gp = "gp"
            ></GPCard>
        </ul>
        <p style="padding: 80px; font-size:20px" v-else-if = "gpEmpty===false">
            Loading results...
        </p>
        <p style="padding: 80px; font-size:20px" v-else>
            Nothing left in the list.
        </p>
    </div>
</template>

<script>
    import GPCard from "../components/GPCard.vue"
    // import firebase from "firebase";
    import { db } from "../main";
    // import {mapGetters} from "vuex";
    import firebase from "firebase";

    export default {
        name: "MyPage",
        // computed: {
        //     ...mapGetters({
        //         uid: "uid",
        //         user: "user"
        //     })
        // },
        components: {
            GPCard
        },
        data(){
            return{
                closedList: [],
                openedList: [],
                participatingList: [],
                gpList:[],
                gpEmpty: false
            };
        },
        async mounted() {
            if (firebase.auth().currentUser == null) {
              return;
            }
            console.log('mounteeeeeeeeeed')
            // await firebase.auth().onAuthStateChanged(function(user) {
            //     if (user) {
            //         this.user = user;
            //         this.uid = this.user.uid;
            //     } else {
            //         this.user = null
            //     }
            // });
            let uid = firebase.auth().currentUser.uid;
            // console.log("AAAAAAAAAAAa");
            console.log(uid);

            const snapshot = await db.ref('users/'+uid).once("value");
            const gpSnapshot = await db.ref('/groupPurchase').once("value");
            let myValue = snapshot.val()&&snapshot.val().gpList;
            console.log("Result of myValue")
            console.log(myValue)
            if (myValue == null) {
              return;
            }
            let keyList = Object.keys(myValue);



            for(let i=keyList.length; i>0 ; i--){
                let myKey = keyList[i-1];
                let gp = myValue[myKey];
                let gpValue = gpSnapshot.val();
                console.log("print gpValue[myKey]")
                console.log(gpValue[myKey])
                gpValue[myKey].key = myKey;
                console.log(myKey);

                if(gpValue[myKey].userKey===uid){
                    gpValue[myKey].opened = true;
                    if(gpValue[myKey].isClosed===true){
                        gpValue[myKey].review = gp.review;
                        this.closedList.push(gpValue[myKey]);
                    }
                    else{
                        this.openedList.push(gpValue[myKey]);
                    }
                }
                else if(gp.participate===true){
                    gpValue[myKey].participate = gp.participate;
                    gpValue[myKey].food = gp.food;
                    if(gpValue[myKey].isClosed===true){
                        gpValue[myKey].review = gp.review;
                        this.closedList.push(gpValue[myKey]);
                    }
                    else{
                        this.participatingList.push(gpValue[myKey]);
                    }
                }
                // if(gpValue[myKey].isClosed===true){
                //     gpValue[myKey].review = gp.review;
                //     this.closedList.push(gpValue[myKey]);
                // }

                // if(gpValue[myKey].isClosed===true){
                //     gpValue[myKey].review = gp.review;
                //     // gpValue[myKey].isClosed = gp.closed;
                //     if(gp.participate===true){
                //         gpValue[myKey].participate = gp.participate;
                //         gpValue[myKey].foodList = gp.foodList;
                //     }
                //     this.closedList.push(gpValue[myKey]);
                // }
                // else if(gp.participate===false){
                //     gpValue[myKey].opened = true;
                //     this.openedList.push(gpValue[myKey]);
                // }
                // else{
                //     gpValue[myKey].participate = gp.participate;
                //     gpValue[myKey].food = gp.food;
                //     this.participatingList.push(gpValue[myKey]);
                // }
            }
            let path = this.$route.path;

            if(path==='/mypage/participate'){
                this.gpList = this.participatingList;
            }
            else if(path === '/mypage/opened'){
                this.gpList = this.openedList;
            }
            else if(path === '/mypage/closed'){
                this.gpList = this.closedList;
            }
            if(this.gpList.length>0){
                this.gpEmpty = false;
            }
            else{
                this.gpEmpty = true;
            }
        },
        methods : {
            enableClosed() {
                this.gpList = this.closedList;
            },
            enableOpened() {
                this.gpList = this.openedList;
            },
            enableParticipate() {
                this.gpList = this.participatingList;
            }
        }

    }
</script>

<style scoped>
    .router-link-active{
        background-color: #48C964;
        color: white;
    }
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
    button{
        height: 40px;
        width: 150px;
        border-radius: 15px;
        background-color: #adf5bc;
        color: #8B8B8B;
        border: 0px;
        font-size: 18px;
        margin-top: 10px;
        margin-right: 15px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    .gpList {
        position: relative;
        padding-top: 80px;
    }
</style>