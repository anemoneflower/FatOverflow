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
        <div class="products" v-if="products.length">
            <div
              v-for="(product, index) in products"
              :key="index"
            >
                <!--                <router-link to="/book-note-board">-->

                <ProductCard 
                  :product="product" 
                  v-on:click.native="showModal(index)"
                  v-if="!showPopup"
                />
                <ViewReview 
                  v-if="showModalList[index]"
                  :foodName="products[index].foodName"
                  :imgUrl="products[index].img"
                  @close="closeModal(index);"
                  :foodKey="productKeys[index]"
                />
                <!--                </router-link>-->
            </div>
        </div>
        <p v-else>
            Nothing left in the list.
        </p>
    </div>
</template>

<script>
    import ViewReview from "./ViewReview"
    import ProductCard from "../components/ProductCard";
    import firebase from "firebase";
    import Vue from 'vue'

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
                showPopup: false
            };
        },
        mounted() {
            firebase
                .database()
                .ref("/food")
                .once("value",snapshot => {
                    let myValue = snapshot.val();
                    let keyList = Object.keys(myValue);
                    for(let i = keyList.length; i>0; i--){
                        let myKey = keyList[i-1];
                        let product = myValue[myKey];
                        (this.products).push(product);
                        this.productKeys.push(myKey)
                        this.showModalList.push(false);
                    }
                    console.log(this.products);
                    console.log(this.productKeys);
                    console.log(this.showModalList);
                })
        },
        methods: {
            // goBoard(index) {
            //     /* var _selectedBook = selectedBook; */
            //     this.$router.push("/product/" + selected.key);
            // },
            goGPList() {
            
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
        padding-left: 12%;
        padding-top: 20px;
        z-index:1;
        background-color: #fff;
        width:100%;
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