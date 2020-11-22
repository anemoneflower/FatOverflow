<template>
    <div id="contactspage">
        <section class="mycontainer animated slideInLeft delay-0s myeffect">
            <div class="columns">
                <div class="column is-8">
                    <form @submit.prevent="savepost">
                        <div class="postfield">
                            <textarea
                                    class="myoutline ppp shadow-none border-light"
                                    id="textarea-default"
                                    v-model="content"
                                    placeholder="Enter something..."
                                    rows="3"
                            ></textarea>
                            <button type="submit" class="button is-link btn shadow-none">Submit</button>
                        </div>
                    </form>
                    <div>
                        <div class="post-list" v-for="post in chats" :key="post.userkey">
<!--                            <p>here</p>-->
                            <div class="cont myoutline">
                                    <h5 class="timestamp" >{{post.time}}</h5>
                                    <p class="namestamp">
                                        {{post.username}}
                                    </p>
                                    <p class="contentstamp">
<!--                                        v-for="b in post.content" v-bind:key=b>-->
                                        {{post.content}}
                                    </p>
                            </div>
                        </div>
                    </div>
<!--                    <div class="loader-section" v-if="loading">-->
<!--                        <div class="user-list">-->
<!--                            <div class="columns">-->
<!--                                <div class="column is-8">-->
<!--                                    <p class="user-list__header animated-background__header"></p>-->
<!--                                    <p class="user-list__sub animated-background__sub"></p>-->
<!--                                    <p class="user-list__sub animated-background__sub"></p>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { db } from "../main";
    import firebase from 'firebase'
    import {mapGetters} from 'vuex'
    import store from "../store";
    export default {
        name: 'Chat',
        components: {
        },
        data () {
            return {
                userName: '',
                userKey: '',
                text: '',
                chats: [
                //     {
                //     content: "test",
                //     time: "date",
                //     username: "name",
                //     userkey: "key",
                // }
                ],
                loading: true,
                user: '',
                content: '',
                profilepicurl: '',
                time: null,
                username:'',
                now: '',
            }
        },
        computed: {
            ...mapGetters({
                chatList: "chatList"
            })
        },
        created () {
            console.log('Posts page created');
            let chatref = db.ref("chat");
            let c = chatref.once("value", function(snapshot) {
                // snapshot.forEach(function (childSnapshot) {
                //     // todo: 바로 출력
                //     let data = {
                //         content: childSnapshot.val().content,
                //         time: childSnapshot.val().time,
                //         username: childSnapshot.val().username,
                //         userkey: childSnapshot.val().userkey,
                //     }
                //     console.log(data);
                //     store.dispatch("storeChats", data);
                //     // this.chats.push(data)
                //     // console.log("child: " + childSnapshot.val()._key)
                // });
                var myValue = snapshot.val();
                var keyList = Object.keys(myValue);
                var chats = [];
                for (var i = 0; i < keyList.length; i++) {
                    var v = myValue[keyList[i]];
                    chats.push(v);
                    console.log("data: ", v);
                }
                console.log("Firebase: ");
                console.log(chats);
                store.dispatch("storeChats", chats);
                return chats;
            });
            c.then((c)=>{
                var v = c.val();
                console.log(v);
                var k = Object.keys(v);
                console.log("KKKKKKK");
                console.log(k);
                for(var i=0; i<k.length; i++){
                    this.chats.push(v[k[i]]);
                }
                console.log("Chats: ");
                console.log(this.chats);
            });

            var user=firebase.auth().currentUser;
            if(user != null){
                this.userName = user.displayName;
                this.userKey = user.uid;
            }
        },

        methods: {
            savepost(){
                console.log('Entered savepost method')
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var key = db.ref('chat').push({
                    content: this.content.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d.toString(),
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
            }
        }
    }
</script>

<style scoped>
    #contactspage{
        width: 100%;
    }
    .myeffect{
        animation-duration: 2s;
    }
    .mycontainer{
        /*background-color: rgb(211, 216, 165);*/
        padding: 3rem;
        margin: auto;
        width: 95%;
        border-radius: 5rem;
    }
    .ppp {
        padding: 1rem;
        width:80%;
        margin: auto;
    }
    .myoutline{
        border-radius: 2rem;
        background-color: rgb(244, 247, 221);
    }
    .postfield{
        font-family: 'Goyang';
        padding: 1rem;
    }
    .cont {
        margin: 2rem;
        text-align: left;
    }
    .timestamp{
        margin-top: 0.5rem;
        font-family: 'Goyang';
        margin-bottom: 0.1rem;
        font-size: 0.8rem;
        color: #B3A580;
        position: left;
    }
    .namestamp{
        font-family: 'Goyang';
        color: hsl(0, 1%, 61%);
        margin-top: 0.1rem;
        font-size: 0.8rem;
    }
    .contentstamp{
        font-family: 'Goyang';
        font-size: 1.1rem;
        text-align: center;
        margin: 0.2rem;
        font-weight: 550;
        color: #685642;
    }
    .btn{
        display: inline-block;
        color: #fff;
        text-decoration: none;
        padding: 0.3rem 1rem;
        font-size: 1.2rem;
        background: #B7C68B;
        border-radius: 0.7rem;
        margin-top: 1rem;
        transition-property: background;
        transition-duration: 0.13s;

    }

    .btn:hover{
        background: #DED29E;
        color: #fff;
    }

    .card-title{
        font-family: 'Goyang', cursive;
        font-size: 100px;
    }
    .card-body{
        font-family: 'Goyang', cursive;
        font-size: 30px;
    }
    h1 {
        font-family: 'LeeHyunJi', cursive;
        font-weight: 900;
        font-size: 4rem;
        padding: 30px;
        color: #685642;
    }

    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
    .animated-background__header {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-name: placeHolderShimmer;
        animation-name: placeHolderShimmer;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: #eeeeee;
        background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
        background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        -webkit-background-size: 800px 104px;
        background-size: 800px 104px;
        height: 20px;
        width: 400px;
        position: relative;
    }
    .animated-background__sub {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-name: placeHolderShimmer;
        animation-name: placeHolderShimmer;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        background: #f6f7f8;
        background: #eeeeee;
        background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
        background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        -webkit-background-size: 800px 104px;
        background-size: 800px 104px;
        height: 20px;
        width: 200px;
        position: relative;
    }
</style>