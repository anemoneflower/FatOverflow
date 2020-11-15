<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Participate purchaseTitle="Sample Purchase Title"/>
    <!-- <div class="view">
      <router-view />
    </div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Participate from './pages/Participate.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    Participate
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.view {
  position: relative;
  padding-top: 180px;
}
</style>
