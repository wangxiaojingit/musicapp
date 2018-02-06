<template>
  <div class="wraper" ref="wrapper">
    <img width="24" height="24" src="./loading.gif" />
    <p class="title">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
export default {
 props:{
   title:{
     type:String,
     default:"正在加载中!"
   }
 },
  data () {
    return {
     
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.wraper{
  width:100%;
  text-align:center;
  
  .title{
    font-size:16px;
    color:#fff;
  }
}
</style>
