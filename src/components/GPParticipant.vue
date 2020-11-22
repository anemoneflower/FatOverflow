<template>
  <div class="orderBlock">
    
    <div class="orderLeft">
      <div
        v-for="food in participant.food"
        :key = "food"
      >
      <p class="orderLeftText">
        {{food[0]}}, {{food[1]}}
      </p>
      </div>
    </div>
    <div>
      <p class="orderRightText">{{participant.id}} </p>
    </div>
    
  </div>
</template>

<script>
export default {
    components :{
        
    },
    props: {
        // participantId: String,
        participant: Object
        // registeredFoodKey: String
    },
    data(){
        return{

        };
    },
}
</script>

<style>
  .orderBlock {
    border-style: solid;
    border-color: #C4C4C4;
    border-width: 1px;
    border-radius: 10px;
    margin-top: 15px;
    padding: 13px 9px 13px 9px;
    width: 378px;
    float: right;
    margin-right: 50px;
  }

  .orderLeft {
    width: 60%;
    float: left;
  }

  .orderLeftText {
    text-align: left;
    font-weight: bold;
    margin-left: 15px;
  }

  .orderRightText {
    text-align: right;
    margin-right: 20px;
  }
</style>
