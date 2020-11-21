<template>
    <div>
        <button class="hashtag">
            {{food}}
        </button>
    </div>
</template>

<script>
export default {
    props:{
        food: {
            type: String
        }
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
        color: #48C964;
        background-color: #fff;
        padding : 3px 12px 3px 12px;
        font-size: 13px;
        margin-right: 10px;
        /*height: 30px;*/
    }
</style>