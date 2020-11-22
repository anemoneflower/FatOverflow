<template>
    <div class="hashtag">
        {{food.quantity}} {{food.foodName}}
    </div>
</template>

<script>
    export default {
        props:{
            food: {
                type: Object
            }
        },
        mounted() {
            console.log(this.food);
        }
    }
</script>

<style scoped>
    .hashtag {
        float: left;
        border-radius: 30px;
        border-style: solid;
        border-width: 1px;
        border-color: #48C964;
        color: #FFFFFF;
        background-color: #48C964;
        padding : 3px 12px 3px 12px;
        font-size: 15px;
        margin-right: 15px;
        /*height: 30px;*/
    }
</style>