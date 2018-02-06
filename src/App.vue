<template>
  <div id="app">
    <v-head></v-head> 
    <tab></tab>
    <router-view/>
    <player></player> 
  </div>
</template>

<script>
import vHead from "@/components/v-head/v-head"
import tab from "@/components/tab/tab"
import player from "@/components/player/player"

export default {
  name: 'app',
  data(){
    return {

    }
  },
 
  components:{
    vHead,tab,player
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:relative;
  
}
</style>
