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
                gpList:[]
            };
        },
        async mounted() {
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
            let myValue = snapshot.val()&&snapshot.val().gpList;

            let keyList = Object.keys(myValue);
            for(let i=keyList.length; i>0 ; i--){
                let myKey = keyList[i-1];
                let gp = myValue[myKey];
                const gpSnapshot = await db.ref('/groupPurchase').once("value");
                let gpValue = gpSnapshot.val();
                gpValue[myKey].key = myKey;
                if(gp.closed===true){
                    gpValue[myKey].review = gp.review;
                    gpValue[myKey].closed = gp.closed;
                    if(gp.participate===true){
                        gpValue[myKey].participate = gp.participate;
                        gpValue[myKey].foodList = gp.foodList;
                    }
                    this.closedList.push(gpValue[myKey]);
                }
                else if(gp.participate===false){
                    gpValue[myKey].closed = gp.closed;
                    this.openedList.push(gpValue[myKey]);
                }
                else{
                    gpValue[myKey].participate = gp.participate;
                    gpValue[myKey].foodList = gp.foodList;
                    this.participatingList.push(gpValue[myKey]);
                }
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
        padding-left: 12%;
        padding-top: 5px;
        z-index:2;
        background-color: #fff;
        width:100%;
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