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
                    :key="product.key"
                    v-for="product in products"

            >
                <!--                <router-link to="/book-note-board">-->
                <ProductCard :product="product" />
                <!--                </router-link>-->
            </div>
        </div>
        <p v-else>
            Nothing left in the list.
        </p>
    </div>
</template>

<script>
    import ProductCard from "../components/ProductCard";
    // import firebase from "firebase";
    import {db} from "../main.js"

    export default {
        components: {
            ProductCard
        },
        props: {
            productkey:String
        },
        data(){
            return {
                products: []
            };
        },
        async mounted() {
            let query = this.$route.query.result;
            if(query === undefined){
                const snapshot = await db.ref("/food").once("value")

                let myValue = snapshot.val();
                let keyList = Object.keys(myValue);
                for(let i = keyList.length; i>0; i--){
                    let myKey = keyList[i-1];
                    let product = myValue[myKey];
                    (this.products).push(product);
                }
            }
            else {
                const snapshot = await db.ref("/food").once("value");
                let myValue = snapshot.val();
                let keyList = Object.keys(myValue);
                for(let i = keyList.length; i>0; i--){
                    let myKey = keyList[i-1];
                    let food = myValue[myKey];
                    if(food.foodName.toLowerCase().includes(query.toLowerCase())){
                        (this.products).push(food);
                    }
                }
            }
        },
        methods: {
            goGPList() {
                let query = this.$route.query.result;
                if (query === undefined){
                    this.$router.push({path:'/gplist'});
                }
                else {
                    this.$router.push({path:'/gplist',query:{result:query}});
                }
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