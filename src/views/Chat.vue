<template>
    <div id="contactspage">
        <section class="mycontainer">
            <div class="column is-8">
                <div>
                    <div>Come at <input type="text" placeholder="(enter time)" v-model="come_at"><button v-on:click="save_at('Come at ', come_at)">send</button></div>
                </div>
                <div>
                    <div>I'll go at <input type="text" placeholder="(enter time)" v-model="go_at"><button v-on:click="save_at('I\'ll go at ', go_at)">send</button></div>
                </div>
                <div>
                    <div>Product will arrive at <input type="text" placeholder="(enter time)" v-model="arrive_at"><button v-on:click="save_at('Product will arrive at ', arrive_at)">send</button></div>
                </div>
                <div>
                    <div>Account is <input type="text" placeholder="(enter bank)" v-model="bank">bank <input type="text" placeholder="(enter account)" v-model="account"><button v-on:click="save_account">send</button></div>
                </div>
                <div>
                    <div>I sent money!<button v-on:click="save_txt('I sent money!')">send</button></div>
                </div>
                <div>
                    <div>"<input type="text" placeholder="(enter username)" v-model="name1">", please send money!<button v-on:click="save_front">send</button></div>
                </div>
                <div>
                    <div>"<input type="text" placeholder="(enter username)" v-model="name2">", you need to give me <input type="text" placeholder="(enter amount of money)" v-model="money"> won!<button v-on:click="save_both">send</button></div>
                </div>
                <div>
                    <div class="post-list" v-for="post in chats" :key="post.time">
<!--                        check if user === owner-->
                        <div class="cont myoutline" v-if="ownerKey===post.userkey" style="background: #d83737">
                            <h5 class="timestamp" >{{post.time}}</h5>
                            <p class="namestamp">
                                {{post.username}}
                            </p>
                            <p class="contentstamp">
                                {{post.content}}
                            </p>
                        </div>
<!--                        check if user's comment-->
                        <div class="cont myoutline" v-else-if="userKey===post.userkey" style="background: #409fcb">
                                <h5 class="timestamp" >{{post.time}}</h5>
                                <p class="namestamp">
                                    {{post.username}}
                                </p>
                                <p class="contentstamp">
                                    {{post.content}}
                                </p>
                        </div>
<!--                        otherwise-->
                        <div class="cont myoutline" v-else style="background: #FFFFFF">
                            <h5 class="timestamp" >{{post.time}}</h5>
                            <p class="namestamp">
                                {{post.username}}
                            </p>
                            <p class="contentstamp">
                                {{post.content}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { db } from "../main";
    import firebase from 'firebase'
    import {mapGetters} from 'vuex'
    // import store from "../store";
    export default {
        name: 'Chat',
        components: {
        },
        data () {
            return {
                ownerKey: '',
                userName: '',
                userKey: '',
                chats: [],
                come_at: '',
                go_at:'',
                arrive_at:'',
                bank:'',
                name1:'',
                name2:'',
                money:'',
                account:'',
                user1: '',
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        },
        async created () {
            await firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    this.user1 = user;
                    this.userName = this.user1.displayName;
                    this.userKey = this.user1.uid;
                } else {
                    console.log('No user');
                    this.user1 = null
                }
            });
            if(!this.isSignin()) alert("ERR: login null");
            console.log('Posts page created');

            this.updateChats();
            // find if owner's uid
            var post = "-MMPFFDBm2EZw2-Wuwob";
            const o = await db.ref("groupPurchase/"+post).child('username').once("value");
            this.ownerKey = o.val();
            console.log("ownerKey: ");
            console.log(this.ownerKey);
        },
        methods: {
            isSignin() {
                return this.user1!==null
            },
            updateChats() {

                let chatref = db.ref("chat");
                let c = chatref.once("value", function(snapshot) {
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
                    return chats;
                });
                c.then((c)=>{
                    var v = c.val();
                    console.log(v);
                    var k = Object.keys(v);
                    console.log("KKKKKKK");
                    console.log(k);
                    this.chats = [];
                    for(var i=0; i<k.length; i++){
                        var ch = v[k[i]];
                        this.chats.push(ch);
                    }
                    console.log("Chats: ");
                    console.log(this.chats);
                });
            },
            refresh_inputs(){
              this.come_at = '';
              this.go_at = '';
              this.arrive_at = '';
              this.bank = '';
              this.name1 = '';
              this.name2 = '';
              this.money = '';
              this.account = '';
            },
            save_at(txt, input){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = txt+input;
                var key = db.ref('chat').push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
                this.updateChats();
                this.refresh_inputs();
            },
            save_account(){
                console.log('Entered save_go_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = "Account is "+this.bank+'bank '+this.account;
                var key = db.ref('chat').push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
                this.updateChats();
                this.refresh_inputs();
            },
            save_txt(txt){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                // var t = "Come at "+this.come_at;
                var key = db.ref('chat').push({
                    content: txt.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
                this.updateChats();
                this.refresh_inputs();
            },
            save_front(){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = `"`+this.name1+`", please send money!`;
                var key = db.ref('chat').push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
                this.updateChats();
                this.refresh_inputs();
            },
            save_both(){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = `"`+this.name2+`", you need to give me `+this.money+' won!';
                var key = db.ref('chat').push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref('chat').child(key).update({
                    _key: key
                });
                this.updateChats();
                this.refresh_inputs();
            },
        }
    }
</script>

<style scoped>
    #contactspage{
        width: 100%;
    }
    .mycontainer{
        /*background-color: rgb(211, 216, 165);*/
        padding: 3rem;
        margin: auto;
        width: 95%;
        border-radius: 5rem;
    }
    .myoutline{
        border-radius: 2rem;
        background-color: rgb(244, 247, 221);
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