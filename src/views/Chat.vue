<template>
    <div id="contactspage">
        <section class="mycontainer">
            <div class="column is-8">
                <a class="title" style="margin: auto; text-align: center;">
                    Chatting Room
                </a>    
                <div class="outer">
                    <div class="inner"></div>
                </div>
                <a class="subTitle">
                    Room Title
                </a>  
                <div id="chatBox" class="inputBorder">
                    <div class="post-list" v-for="post in chats" :key="post.time">
<!--                        check if user === owner-->
                        <div class="rightText" v-if="ownerKey===post.userkey && ownerKey===userKey">
                            <div class="namestamp">
                                {{getName(post.username)}}
                            </div>
                            <div class="timestamp" >
                                {{getDate(post.time)}}
                            </div>
                            <div class="contentstamp" style="background-color: #f1d73f">
                                {{post.content}}
                            </div>
                        </div>
                        <div class="leftText" v-else-if="ownerKey===post.userkey">
                            <div class="namestamp">
                                {{getName(post.username)}}
                            </div>
                            <div class="timestamp" >
                                {{getDate(post.time)}}
                            </div>
                            <div class="contentstamp" style="background-color: #f1d73f">
                                {{post.content}}
                            </div>
                        </div>
<!--                        check if user's comment-->
                        <div class="rightText" v-else-if="userKey===post.userkey">
                            <div class="namestamp">
                                {{getName(post.username)}}
                            </div>
                            <div class="timestamp" >
                                {{getDate(post.time)}}
                            </div>
                            <div class="contentstamp" style="background-color: #5fd265">
                                {{post.content}}
                            </div>
                        </div>
<!--                        otherwise-->
                        <div class="leftText" v-else>
                            <div class="namestamp">
                                {{getName(post.username)}}
                            </div>
                            <div class="timestamp">
                                {{getDate(post.time)}}
                            </div>
                            <div class="contentstamp" style="background-color: #5c86f1">
                                {{post.content}}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="messagecmd">
                    <div style="float:left; font-size:18px; margin-left:10px; font-weight:bold; margin-top:5px;">
                        <div>Message Form</div>
                    </div>
                    <div v-if="userKey==ownerKey">
                        <div class="message" style="margin-left:425px">
                            <div>Come at <input class="timeInput" type="text" placeholder="hh" v-model="come_at_h">:<input class="timeInput" type="text" placeholder="mm" v-model="come_at_m"><button class="sendBtn" v-on:click="save_at('Come at ', come_at_h, come_at_m)">send</button></div>
                        </div>
                        <div class="message" style="margin-left:249px">
                            <div>Account is <input class="bankInput" type="text" placeholder="Bank" v-model="bank"> bank <input class="accountInput" type="text" placeholder="Account Number" v-model="account"><button class="sendBtn" v-on:click="save_account">send</button></div>
                        </div>
                        <div class="message" style="margin-left:195px">
                            <div>"<input class="userInput" type="text" placeholder="Username" v-model="name2">", you need to give me <input class="moneyInput" type="text" placeholder="Price" v-model="money"> won!<button class="sendBtn" v-on:click="save_both">send</button></div>
                        </div>
                        <div class="message" style="margin-left:429px">
                            <div>"<input class="userInput" type="text" placeholder="Username" v-model="name3">", OK <button class="sendBtn" v-on:click="save_ok">send</button></div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="message" style="margin-left:426px">
                            <div>I'll go at <input class="timeInput" type="text" placeholder="hh" v-model="go_at_h">:<input class="timeInput" type="text" placeholder="mm" v-model="go_at_m"><button class="sendBtn" v-on:click="save_at('I\'ll go at ', go_at_h, go_at_m)">send</button></div>
                        </div>
                        <div class="message" style="margin-left:448px">
                            <div>I sent money!<button class="sendBtn" v-on:click="save_txt('I sent money!')">send</button></div>
                        </div>
                        <div class="message" style="margin-left:524px">
                            <div>OK!<button class="sendBtn" v-on:click="save_txt('OK')">send</button></div>
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
                account:''
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        },
        async created () {
            console.log('Posts page created');

            var user1=firebase.auth().currentUser;
            if(this.user.loggedIn){
                this.userName = user1.displayName;
                this.userKey = user1.uid;
            }else{
                alert("ERR: login null");
            }
            this.updateChats();
            // find if owner's uid
            var post = "-MMPFFDBm2EZw2-Wuwob";
            const o = await db.ref("groupPurchase/"+post).child('username').once("value");
            this.ownerKey = o.val();
            console.log("ownerKey: ");
            console.log(this.ownerKey);
            this.initChats();
        },
        methods: {
            initChats() {
                var container = this.$el.querySelector("#chatBox");
                console.log(container);
                container.scrollTop = container.scrollHeight;
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
            async save_at(txt, input1, input2){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = txt+input1 + ":" + input2;
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
                this.initChats();
                this.refresh_inputs();
            },
            async save_account(){
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
                this.initChats();
                this.refresh_inputs();
            },
            async save_txt(txt){
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
                await this.updateChats();
                this.refresh_inputs();
                this.initChats();
            },
            async save_front(){
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
                this.initChats();
                this.refresh_inputs();
            },
            async save_both(){
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
                this.initChats();
                this.refresh_inputs();
            },
            async save_ok() {
                console.log('Entered send_ok method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = `"`+this.name3+`", OK `;
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
                this.initChats();
                this.refresh_inputs();
            },
            getName(namesrc) {
                if(namesrc === '') {
                    return "None";
                }
                return namesrc;
            },
            getDate(datesrc) {
                console.log("date");
                var strL = datesrc.split(" ");
                var hms = strL[4].split(":");
                console.log(hms);
                return strL[1] + " " + strL[2] + "  " + hms[0] + ":" + hms[1];
            }
        }
    }
</script>

<style scoped>
    #contactspage{
        width: 90%;
        min-width: 1000px;
        margin-left: 5%;
    }
    .mycontainer{
        /*background-color: rgb(211, 216, 165);*/
        padding-top: 30px;
        margin: auto;
        width: 95%;
        border-radius: 5rem;
    }
    .timestamp{
        font-family: 'Goyang';
        font-size: 10px;
        color: #B3A580;
        padding: 0px 8px 3px 8px;
    }
    .namestamp{
        font-family: 'Goyang';
        color: hsl(0, 1%, 61%);
        font-size: 12px;
        font-weight: 500;
        padding: 0px 7px 0px 7px;
    }
    .contentstamp{
        font-family: 'Goyang';
        font-size: 13px;
        text-align: center;
        padding: 7px 16px 7px 16px;
        font-weight: 400;
        color: #fff;
        border-radius: 16px;
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

    .post-list {
        margin:0px 0px 0px 5px;
        width: 600px;
        height: 70px;
    }

    #chatBox {
        height: 350px;
        overflow-y: scroll;
        left: 50%;
        margin-top: 20px;
        margin-left: -310px;
        width: 620px;
        position: absolute;
    }
    #chatBox::-webkit-scrollbar {
        width: 12px;
    }
    #chatBox::-webkit-scrollbar-thumb {
        background-color: none;
        border-radius: 6px;
    }
    #chatBox:hover::-webkit-scrollbar-thumb {
        background: #dadada;
    }
    #chatBox::-webkit-scrollbar-track {
        background-color: none;
    }

    #messagecmd {
        position: absolute;
        left: 50%;
        width: 620px;
        margin-left: -310px;
        margin-top: 385px;
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
        box-shadow: 0px 0px 10px 50px #48C964;
    }
    .outer {
        width: 370px;
        height: 3px;
        margin: 5px auto 5px;
        /* alignment: left; */
        overflow: hidden;
        position: relative;
        /* background-color: #f37022; */
        outline: none;
    }
    .subTitle {
        width: 800px;
        height: 30px;
        margin: auto;
        /* text-align: left;
        margin-bottom: 30px; */
        font-size: 23px;
        font-weight: bold;
        color: #3a3a3a;
    }
    .inputBorder {
        border-radius: 3px;
        border-color: #cbcbcb;
        border-style: solid;
        border-width: thin;
    }
    .rightText {
        float: right;
        text-align: right;
    }
    .leftText {
        float: left;
        text-align: left;
    }

    .message {
        margin: 5px 0px 1px 0px;
        font-size:17px;
    }
    .sendBtn {
        outline: none;
        background-color: #48C964;
        color: #fff;
        border-radius: 10px;
        border-width: 0px;
        font-size: 15px;
        padding: 5px 10px 7px 10px;
        cursor: pointer;
        margin-left: 5px;
    }
    .sendBtn:hover {
        background-color: #2f8542;
    }

    .bankInput {
        width: 50px;
        height: 17px;
        text-align: center;
    }
    .accountInput {
        width: 110px;
        height: 17px;
        text-align: center;
    }
    .timeInput {
        width: 20px;
        height: 17px;
        text-align: center;
    }
    .userInput {
        width: 70px;
        height: 17px;
        text-align: center;
    }
    .moneyInput {
        width: 55px;
        height: 17px;
        text-align: center;
    }
</style>