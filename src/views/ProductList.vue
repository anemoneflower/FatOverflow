<template>
    <div>
        <div class="head">
            <div class = "gpbtn">
                <button id="gpbtn" @click="goGPList()">Group Purchase</button>
            </div>
            <div class = "reviewbtn">
                <button id="reviewbtn">Products</button>
            </div>
        </div>
        <div class="products" v-if="products.length>0">
            <div
              v-for="(product, index) in products"
              :key="index"
            >
                <!--                <router-link to="/book-note-board">-->

                <ProductCard 
                  :product="product" 
                  v-on:click.native="showModal(index)"
                />
                <ViewReview 
                  v-if="showModalList[index]"
                  :foodName="products[index].foodName"
                  :imgUrl="products[index].img"
                  :website="products[index].website"
                  @close="closeModal(index);"
                  :foodKey="productKeys[index]"
                />
                <!--                </router-link>-->
            </div>
        </div>
        <p style="padding: 80px; font-size:20px" v-else-if="foodEmpty===false">
            Loading results...
        </p>
        <p style="padding: 80px; font-size:20px" v-else>
            Nothing left in the list.
        </p>
    </div>
</template>

<script>
    import ViewReview from "./ViewReview"
    import ProductCard from "../components/ProductCard";
    import Vue from 'vue'
    import {db} from "../main.js"
    import firebase from "firebase";

    export default {
        components: {
            ProductCard,
            ViewReview
        },
        props: {
            productkey:String
        },
        data(){
            return {
                products: [],
                productKeys: [],
                showModalList: [],
                showPopup: false,
                foodEmpty: false,
            };
        },
        async mounted() {
            let query = this.$route.query.result;
            const products = [];
            const productKeys = [];
            const showModalList = [];
            if(query === undefined){
                const ref = await db.ref("food");
                const snapshot = await ref.orderByChild('foodName').once("value");
                snapshot.forEach(function(child){
                    // console.log(child.val().foodName);
                    const v = child.val();
                    products.push(v);
                    productKeys.push(child.key);
                    showModalList.push(false);
                })
            }
            else {
                const ref = await db.ref("food");
                const snapshot = await ref.orderByChild('foodName').once("value");
                snapshot.forEach(function(child){
                    // console.log(child.val().foodName);
                    const v = child.val();
                    if(v.foodName.toLowerCase().includes(query.toLowerCase())) {
                        products.push(v);
                        productKeys.push(child.key);
                        showModalList.push(false);
                    }
                })
            }
            this.products = products;
            if(this.products.length>0){
                this.foodEmpty = false;
            }
            else{
                this.foodEmpty = true;
            }
            this.productKeys = productKeys;
            this.showModalList = showModalList;
        },
        methods: {
            goGPList() {
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
                  return;
                }
                let query = this.$route.query.result;
                if (query === undefined) {
                  

                  this.$router.push({path:'/gplist'});
                }
                else {
                    this.$router.push({path:'/gplist',query:{result:query}});
                }
            
            },
            showModal(index) {
              console.log("ShowModal for index", index);
              Vue.set(this.showModalList, index, true);
              console.log(this.showModalList);
              this.showPopup = true;
            },
            closeModal(index) {
              console.log("closeModal for index", index);
              Vue.set(this.showModalList, index, false);  
              console.log(this.showModalList);
              this.showPopup = false;    

            }
        }
    }
</script>

<style scoped>
    .head{
        position: fixed;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
        left: 50%;
        margin-left: -786px;
        padding-top: 20px;
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
    #gpbtn:hover {
        background-color: #99e5aa;
        color: #818181;
    }
    #reviewbtn{
        height: 40px;
        width: 150px;
        border-radius: 15px;
        background-color: #48C964;
        color: white;
        border: 0px;
        font-size: 18px;
        margin-top: 10px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
    }
    #reviewbtn:hover {
        background-color: #43be5d;
        color: #f5f5f5;
    }
    .products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, auto));
        grid-auto-rows: minmax(300px, auto);
        column-gap: 40px;
        row-gap: 20px;
        padding-top: 80px;
        margin-left: 90px;
        margin-right: 90px;
    }
</style>