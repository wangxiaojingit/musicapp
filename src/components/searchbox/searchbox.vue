<template>
  <div class="searchbox2">
    <div class="icon-search"></div>
    <input type="text"  :placeholder="placeholder" v-model="query">
    <div v-show="query" class="icon-dismiss" @click="clear"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    placeholder:{
      type:String,
      default:"搜索歌曲"
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created(){
    this.$watch("query",(newQuery) => {
       this.$emit("querychange",newQuery)
    })
  },
  methods:{
    clear(){
      this.query=""
    },
    setquery(key){
      this.query=key
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.searchbox2{
   display:flex;
   align-items :center;
   
   width:100%;
   height:40px;
   font-size:0;
   background:$color-highlight-background;
   .icon-search{
      flex:0 0 40px;
      width:40px;
      font-size:20px;
      text-align:center;
   }
   input{
    padding-left:10px;
     
    width:100%;
    height:40px;
    flex:1;
    background:none;
    color:#fff;
    font-size:14px;
    
   }
   .icon-dismiss{
     flex:0 0 40px;
      width:40px;
     font-size:16px;
     text-align:center;
   }

  
}
</style>
