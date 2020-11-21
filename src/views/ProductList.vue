<template>
    <div>
        <div class="head">
            <div class = "gpbtn">
                <button id="gpbtn">Group Purchase</button>
            </div>
            <div class = "reviewbtn">
                <button id="reviewbtn" @click="goProducts()">Reviews</button>
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
    import firebase from "firebase";

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
                    }
                })
        },
        // methods: {
        //     goBoard(index) {
        //         /* var _selectedBook = selectedBook; */
        //         this.$router.push("/product/" + selected.key);
        //     }
        // }
    }
</script>

<style scoped>
    .head{
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: auto auto;
        justify-content: start;
        margin-left: 50px;
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
        margin-right: 5px;
        /* font-weight: bold; */
        cursor: pointer;
        outline: none;
        text-decoration: none;
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
    .result {
        font-size: 25px;
        padding-top: 50px;
        padding-left: 120px;
        text-align: left;
        position: relative;
        width: 80%;
    }
    .products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, auto));
        grid-auto-rows: minmax(300px, auto);
        column-gap: 40px;
        row-gap: 20px;
        padding-top: 20px;
        margin-left: 90px;
        margin-right: 90px;
    }
</style>