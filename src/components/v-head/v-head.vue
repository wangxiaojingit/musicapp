<template>
  <div class="headWrapper">
     <span class="icon"></span>
     <span class="text">Music App</span>
     <div class="peopleCenter">
       <i class="icon-mine"></i>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.headWrapper{
  position:relative;
  height:44px;
  line-height:44px;
  width:100%;
  text-align:center;
  font-size:0;
  .icon{
    display:inline-block;
    width:30px;
    height:32px;
    margin-right:9px;
    background-size:100%;
    vertical-align :top;
    margin-top:6px;
    bg-image(logo)

  }
  .text{
    display:inline-block;
    hight:44px;
    line-height:44px;
    font-weight:bold;
    font-size:$font-size-medium
    color: $color-theme
  }
  .peopleCenter{
    position:absolute;
    right:6px;
    top:10px;
    .icon-mine{
      font-size:24px;
      color: $color-theme
    }
  }
}
</style>
