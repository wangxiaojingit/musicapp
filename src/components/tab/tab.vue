<template>
  <div class="tabWrapper">
      <router-link to="/recommond" tag="div" class="tab_item"><span >推荐</span></router-link>
      <router-link to="/singer" tag="div" class="tab_item"><span >歌手</span></router-link>
      <router-link to="/rank" tag="div" class="tab_item"><span class="tab_item" >排行</span></router-link>
      <router-link to="/search" tag="div" class="tab_item"><span class="tab_item" >搜索</span></router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
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
.tabWrapper{
  display:flex
  height:44px;
  line-height:44px;
  font-size:$font-size-medium-x
  color:$color-text-l
  font-weight:bold;
  .tab_item{
    display:inline-block;
    flex:1;
    text-align:center;
    &.active{
      color:$color-theme
    }
  }
}
</style>
