<template>
    <div class="product-wrap">
        <div class="product-info">
            <img class="thumbnail" :src="product.img" style="position: relative;" />
            <h1 class="name">{{ product.foodName }}</h1>
            <h2 class="site">{{ product.website }}</h2>
            <button>Evaluation</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductCard",
        props: {
            product: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .product-wrap {
        position: relative;
        height: 300px;
        width: 200px;
        display: block;
        background-color: #fff;
        margin: 20px;
        box-shadow: 0px 20px 50px #d9dbdf;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all 0.3s ease;
        cursor: pointer;
        text-decoration: none;
        outline: none;
    }
    .product-wrap:hover {
        -webkit-transform: translate(20px, -10px);
        -ms-transform: translate(10px, -10px);
        transform: translate(10px, -10px);
        -webkit-box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }

    .product-wrap:hover .thumbnail {
        opacity: 0.6;
    }

    .product-wrap:hover .book-info {
        opacity: 1;
    }
    .thumbnail {
        background: black;
        height: 150px;
        width: 100%;
        overflow: hidden;
        display: block;
    }
    .product-info {
        position: absolute;
        bottom: 0;
        background: #fff;
        width: 190px;
        padding: 20px 5px 20px 5px;
        opacity: 0.8;
    }
    .name {
        margin: 0;
        padding: 0 0 10px;
        color: #3a3a3a;
        font-size: 20px;
        font-weight: 700;
    }
    .site {
        margin: 0;
        padding: 0 0 20px;
        color: #f37022;
        font-size: 15px;
        font-weight: 400;
    }
</style>