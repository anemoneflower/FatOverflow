<template>
    <div class="hashtag">
        {{food}}
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
        border-radius: 30px;
        border-style: solid;
        border-width: 1px;
        border-color: #48C964;
        color: #48C964;
        width: 180px;
        /*height: 30px;*/
    }
</style>