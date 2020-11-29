<template>
    <div class="product-wrap">
        <div class="product-info">
            <img class="thumbnail" :src="product.img" style="position: relative;" />
            <div class="nameDiv">
                <h1 class="name">{{ product.foodName }}</h1>
            </div>
            <h2 class="site">{{ product.website }}</h2>
            <button class="rating">Rating</button>
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
        },
        methods: {
            getImage(imgsrc) {
                if(imgsrc == null) {
                    return imgsrc;
                }
                return "../assets/placeholder.png"
            }
        }
    }
</script>

<style scoped>
    .product-wrap {
        position: relative;
        height: 295px;
        width: 200px;
        display: block;
        background-color: #fff;
        margin: 20px;
        border-radius: 20px;
        box-shadow: 20px 20px 50px #d9dbdf;
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
        opacity: 0.8;
    }

    .thumbnail {
        background: black;
        height: 150px;
        width: 90%;
        margin-left: 5%;
        overflow: hidden;
        display: block;
        border: 0.5px solid #f3f3f3;
        border-radius: 10px;
    }
    .product-info {
        position: absolute;
        top: 0;
        background: #fff;
        border-radius: 20px;
        width: 190px;
        padding: 20px 5px 10px 5px;
        opacity: 0.8;
    }
    .nameDiv {
        margin: 5px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }
    .name {
        color: #3a3a3a;
        font-size: 20px;
        font-weight: 600;
    }
    .site {
        margin: 0;
        padding: 3px 0 10px;
        color: #f2803c;
        font-size: 15px;
        font-weight: 400;
        overflow:hidden;
        text-overflow: ellipsis;
    }

    .rating {
        outline: none;
        background-color: #48C964;
        color: #fff;
        border-radius: 7px;
        border-width: 0px;
        font-size: 13px;
        padding: 5px 10px 5px 10px;
        cursor: pointer;
        float: right;
        margin-right: 10px;
    }

    .rating:hover {
        background-color: #43be5d;
        color: #f5f5f5;
    }
</style>