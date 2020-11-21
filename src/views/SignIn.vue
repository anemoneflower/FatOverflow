<template>
    <div class="container" @keyup.enter.up="keyPress">
        <img id="banner" src="../assets/logo.png" @click="goHome" style="width: 200px; cursor: pointer;"/>
<!--        <div class="id">
            <input
                    id="inputId"
                    v-model="userId"
                    type="text"
                    placeholder="ID"
                    autocomplete="off"
            />
        </div>
        <div class="password">
            <input
                    id="inputPw"
                    v-model="userPw"
                    type="password"
                    placeholder="password"
            />
        </div> 
        <div class="submit">
            <button id="btn" @click="signIn">Sign In</button>
        </div>
-->
        <button id='google' @click="googleLogin">Sign in with Google Account</button>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { current, isSignIn, userKey } from "../main"; //TODO: use vuex

    export default {
        name: "SignIn",
        data() {
            return {
                users: [],
                userId: "",
                userPw: "",
                success: false
                // checkSignIn:isSignIn
            };
        },
        created() {
            console.log("A");
            console.log(this.users);
            var users = new Array();
            firebase
                .database()
                .ref("/user/")
                .once("value", function(snapshot) {
                    var myValue = snapshot.val();
                    var keyList = Object.keys(myValue);
                    console.log(users);
                    for (var i = 0; i < keyList.length; i++) {
                        var myKey = keyList[i];
                        var userObj = myValue[myKey];
                        userObj.key = myKey;
                        console.log(myKey);
                        users.push(userObj);
                        console.log(users);
                    }
                });
            this.users = users;
            console.log(this.users);
        },
        methods: {
            signIn() {
                var uid = this.userId;
                var upw = this.userPw;

                for (var i = 0; i < this.users.length; i++) {
                    var userObj = this.users[i];
                    if (userObj.userId == uid && userObj.userPw == upw) {
                        isSignIn.pop();
                        isSignIn.push(true);
                        userKey.push(userObj);
                        this.success = true;
                    }
                }
                if (this.success) {
                    this.$router.push(current[0]);
                } else {
                    alert("Sign in is invalid");
                }
            },
            goHome() {
                this.$router.push("/");
            },
            keyPress() {
                var uid = this.userId;
                var upw = this.userPw;

                for (var i = 0; i < this.users.length; i++) {
                    var userObj = this.users[i];
                    if (userObj.userId == uid && userObj.userPw == upw) {
                        isSignIn.pop();
                        isSignIn.push(true);
                        userKey.push(userObj);
                        this.success = true;
                    }
                }
                if (this.success) {
                    this.$router.push(current[0]);
                } else {
                    alert("Sign in is invalid");
                }
            },
            googleLogin() {
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider).then((result) => {
                    console.log(result);
                    // result.user.email
                    // TODO: 유저의 어떤 정보를 가지고 있을지 정해야함
                    this.$router.replace('/');
                }).catch((err)=>{
                    alert('OOPS.. ' + err.message)
                })
            }
        }
    };
</script>

<style scoped>
    .container {
        border: 0px solid;
        border-radius: 30px 30px 30px 30px;
        width: 450px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 110px;
        height: 240px;
        box-shadow: 0px 20px 50px #d9dbdf;
    }
    #banner {
        margin-top: 29px;
    }
    .id {
        margin-top: 20px;
    }
    .password {
        margin-top: 10px;
    }

    #inputId {
        outline: none;
        margin-top: 10px;
        width: 400px;
        height: 60px;
        border-radius: 10px;
        border: 1px solid #cbcbcb;
        font-size: 20px;
        padding-left: 15px;
    }

    #inputId:focus {
        box-shadow: 0px 0px 3px 2px #48C964;
    }

    #inputPw {
        width: 400px;
        height: 60px;
        border-radius: 10px;
        border: 1px solid #cbcbcb;
        font-size: 20px;
        padding-left: 15px;
        margin-top: 20px;
        outline: none;
    }

    #inputPw:focus {
        box-shadow: 0px 0px 3px 2px #48C964;
    }

    .submit {
        margin-top: 20px;
    }
    #btn {
        height: 60px;
        width: 420px;
        border-radius: 10px;
        background-color: #48C964;
        color: white;
        border: 0px;
        font-size: 23px;
        margin-top: 10px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    

    #google {
        height: 50px;
        width: 320px;
        border-radius: 20px;
        background-color: #48C964;
        color: white;
        border: 0px;
        font-size: 20px;
        margin-top: 28px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    #google:hover {
        background-color: #43be5d;
        color: #f5f5f5;
    }
</style>
