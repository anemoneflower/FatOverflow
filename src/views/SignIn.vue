<template>
    <div class="container">
        <img id="banner" src="../assets/logo.png" @click="goHome" style="width: 200px; cursor: pointer;"/>
        <button id='google' @click="googleLogin">Sign in with Google Account</button>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {mapGetters} from "vuex";

    export default {
        name: "SignIn",
        computed: {
          ...mapGetters({
              previousUrl: "previousUrl"
          })
        },
        methods: {
            goHome() {
                this.$router.push("/");
            },
            googleLogin() {
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider).then((result) => {
                    console.log(result);
                    console.log("prevURL  " + this.previousUrl);
                    this.$router.replace(this.previousUrl);
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
