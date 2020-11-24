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
                    {{title}}
                </a>
                <div id="chatBox" class="inputBorder">
                    <div class="post-list" v-for="post in chats" :key="post._key">
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
                    <div v-if="userKey==ownerKey" style="float:right;">
                        <table>
                            <tr>
                                <td class="message">
                                    Come at <input class="timeInput" type="text" placeholder="hh" v-model="come_at_h">:<input class="timeInput" type="text" placeholder="mm" v-model="come_at_m"> in
                                    <input class="timeInput" type="number" placeholder="MM" v-model="go_in_mm">/
                                    <input class="timeInput" type="number" placeholder="DD" v-model="go_in_dd">
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_at('Come at ', come_at_h, come_at_m, go_in_mm, go_in_dd)">send</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="message">
                                    Account is <input class="bankInput" type="text" placeholder="Bank" v-model="bank"> bank <input class="accountInput" type="text" placeholder="Account Number" v-model="account">
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_account">send</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="message">
                                    "<input class="userInput" type="text" placeholder="Username" v-model="name2">", you need to give me <input class="moneyInput" type="text" placeholder="Price" v-model="money"> won!
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_both">send</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="message">
                                    "<input class="userInput" type="text" placeholder="Username" v-model="name3">", OK
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_ok">send</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div v-else style="float:right;">
                        <table>
                            <tr>
                                <td class="message">
                                    I'll go at <input class="timeInput" type="number" placeholder="hh" v-model="go_at_h">:
                                    <input class="timeInput" type="number" placeholder="mm" v-model="go_at_m"> in 
                                    <input class="timeInput" type="number" placeholder="MM" v-model="go_in_mm">/
                                    <input class="timeInput" type="number" placeholder="DD" v-model="go_in_dd">
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_at('I\'ll go at ', go_at_h, go_at_m, go_in_mm, go_in_dd)">send</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="message">
                                    I sent money!
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_txt('I sent money!')">send</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="message">
                                    OK!
                                </td>
                                <td>
                                    <button class="sendBtn" v-on:click="save_txt('OK')">send</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { db } from "../main";
    import firebase from 'firebase'
    export default {
        name: 'Chat',
        components: {
        },
        props: {
            gpKey: String,
        },
        data () {
            return {
                title:'',
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
                come_at_h:'',
                name3:'',
                go_at_h:'',
                go_at_m: '',
                come_at_m:'',
                go_in_mm: '',
                go_in_dd: ''
            }
        },
        async created () {
            if (firebase.auth().currentUser == null) {
              return;
            }
            this.user1 = firebase.auth().currentUser;
            this.userName = this.user1.displayName;
            this.userKey = this.user1.uid;
            if(!this.isSignin()) alert("ERR: login null");
            console.log('Posts page created');
            // this.updateChats();
            let chatref = db.ref("groupPurchase/"+this.gpKey+"/chat");
            await chatref.on("value", this.onchange);
            console.log("gpkey: "+this.gpKey);

            // find if owner's uid
            // var post = "-MMPFFDBm2EZw2-Wuwob";
            const t = await db.ref("groupPurchase/"+this.gpKey).child('title').once("value");
            this.title = t.val();
            console.log(this.title);
            const o = await db.ref("groupPurchase/"+this.gpKey).child('userKey').once("value");
            this.ownerKey = o.val();
            console.log("ownerKey: ");
            console.log(this.ownerKey);
            this.initChats();
        },
        updated(){
            this.initChats();
        },
        methods: {
            onchange(snapshot){
                var myValue = snapshot.val();
                if(myValue===null) return;
                var keyList = Object.keys(myValue);
                var chats = [];
                for (var i = 0; i < keyList.length; i++) {
                    var v = myValue[keyList[i]];
                    chats.push(v);
                    console.log("data: ", v);
                }
                console.log("Firebase: ");
                console.log(chats);
                this.chats = chats;
            },
            initChats() {
                var container = this.$el.querySelector("#chatBox");
                console.log("CONTAINER: ");
                console.log(container.scrollHeight);
                container.scrollTop = container.scrollHeight;
            },
            isSignin() {
                return this.user1!==null
            },
            // updateChats() {
            //     let chatref = db.ref("groupPurchase/"+this.gpKey+"/chat");
            //     let c = chatref.once("value", function(snapshot) {
            //
            //         var myValue = snapshot.val();
            //         if(myValue===null) return null
            //         var keyList = Object.keys(myValue);
            //
            //         var chats = [];
            //         for (var i = 0; i < keyList.length; i++) {
            //             var v = myValue[keyList[i]];
            //             chats.push(v);
            //             console.log("data: ", v);
            //         }
            //         console.log("Firebase: ");
            //         console.log(chats);
            //         return chats;
            //     });
            //     if(c===null)return;
            //     c.then((c)=>{
            //         var v = c.val();
            //         console.log(v);
            //         var k = Object.keys(v);
            //         console.log("KKKKKKK");
            //         console.log(k);
            //         this.chats = [];
            //         for(var i=0; i<k.length; i++){
            //             var ch = v[k[i]];
            //             this.chats.push(ch);
            //         }
            //         console.log("Chats: ");
            //         console.log(this.chats);
            //         // this.initChats();
            //         this.refresh_inputs();
            //     });
            // },
            refresh_inputs(){
                this.come_at = '';
                this.go_at = '';
                this.arrive_at = '';
                this.bank = '';
                this.name1 = '';
                this.name2 = '';
                this.name3='';
                this.money = '';
                this.account = '';
                this.go_at_h ='';
                this.go_at_m = '';
                this.come_at_h ='';
                this.come_at_m ='';
                this.go_in_mm= '';
                this.go_in_dd= '';
                this.user1= '';
            },
            save_at(txt, input1, input2, i3, i4){
                console.log('Entered save_come_at method');
                if(txt==='') return;
                if(input1==='') return;
                if(input2==='')return;
                if((i3==='')||(i4===''))return;
                if((txt==="Come at ") || (txt==="I'll go at ")){

                    if((Number(input1)>24) || (Number(input1)<0)) {
                        // alert("check time!");
                        this.$notify({
                            group: 'error',
                            title: 'check time!',
                            // text: 'Hello user! This is a notification!',
                            duration: 5000,
                            type: 'error'
                        });
                        return
                    }
                    if((Number(input2)>59)||(Number(input2)<0)){
                        this.$notify({
                            group: 'error',
                            title: 'check time!',
                            // text: 'Hello user! This is a notification!',
                            duration: 5000,
                            type: 'error'
                        });
                        return
                    }
                    if((Number(i3)>12)||(Number(i3<1))||(Number(i4>31))||(Number(i4<1))){
                        this.$notify({
                            group: 'foo',
                            title: 'check date!',
                            // text: 'Hello user! This is a notification!',
                            duration: 5000,
                            type: 'error'
                        });
                        return
                    }
                }
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                var t = txt+input1 + ":" + input2+" in "+i3+"/"+i4;
                var key = db.ref("groupPurchase/"+this.gpKey+"/chat").push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref("groupPurchase/"+this.gpKey+"/chat").child(key).update({
                    _key: key
                });
                this.refresh_inputs();
                // this.updateChats();

            },
            async save_account(){
                console.log('Entered save_go_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                if((this.bank==='')||(this.account===''))return;
                var t = "Account is "+this.bank+'bank '+this.account;
                var key = db.ref("groupPurchase/"+this.gpKey+"/chat").push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref("groupPurchase/"+this.gpKey+"/chat").child(key).update({
                    _key: key
                });
                // this.updateChats();
                // this.initChats();
                this.refresh_inputs();
            },
            async save_txt(txt){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                // var t = "Come at "+this.come_at;
                if(txt==='')return;
                var key = db.ref("groupPurchase/"+this.gpKey+"/chat").push({
                    content: txt.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref("groupPurchase/"+this.gpKey+"/chat").child(key).update({
                    _key: key
                });
                // await this.updateChats();
                this.refresh_inputs();
                // this.initChats();
            },
            async save_both(){
                console.log('Entered save_come_at method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                if((this.name==='')||(this.money==='')) return ;
                var t = `"`+this.name2+`", you need to give me `+this.money+' won!';
                var key = db.ref("groupPurchase/"+this.gpKey+"/chat").push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref("groupPurchase/"+this.gpKey+"/chat").child(key).update({
                    _key: key
                });
                // this.updateChats();
                // this.initChats();
                this.refresh_inputs();
            },
            async save_ok() {
                console.log('Entered send_ok method');
                var d = Date(Date.now()).toString().split(" ").splice(0, 5).join(' ');
                if(this.name3==='')return ;
                var t = `"`+this.name3+`", OK `;
                var key = db.ref("groupPurchase/"+this.gpKey+"/chat").push({
                    content: t.replace(/(\r\n|\n|\r)/gm, "<br>"),
                    time: d,
                    username: this.userName,
                    userkey: this.userKey,
                }).key;
                db.ref("groupPurchase/"+this.gpKey+"/chat").child(key).update({
                    _key: key
                });
                // this.updateChats();
                // this.initChats();
                this.refresh_inputs();
            },
            getName(namesrc) {
                if(namesrc === '') {
                    return "None";
                }
                return namesrc;
            },
            getDate(datesrc) {
                // console.log("date");
                var strL = datesrc.split(" ");
                var hms = strL[4].split(":");
                // console.log(hms);
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
        margin: 7px 0px 1px 0px;
        float:right;
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
        width: 37px;
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