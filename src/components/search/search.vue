<template>
  <div class="searchWrapper">
     <div class="searchbox">
        <searchbox @querychange="querychange" ref="search"></searchbox>
     </div>
     <div class="bottom">
      <ul class="hotWrapper" v-show="hotkey.length && !query">
         <li v-for="item in hotkey" @click="addquery(item)">{{item.k}}</li>
      </ul>
      <div class="suggetWrapper" v-show="query">
        <sugget :query="query" :pullUp="true" @select="select"></sugget>
      </div>
     </div>
     <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import sugget from "@/components/sugget/sugget" 
import searchbox from "@/components/searchbox/searchbox" 
import {getHotKey} from "@/api/search"
import { mapMutations,mapActions } from 'vuex';
export default {
  data () {
    return {
      hotkey: [],
      query:""
    }
  },
  created(){
    this._getHotKey()
  },
  components:{
    sugget,searchbox
  },
  methods:{
     ...mapMutations(["set_singer"]),
     ...mapActions(["addSong"]),
      _getHotKey(){
        getHotKey().then((res)=>{
           if(res.code==0){
              this.hotkey=res.data.hotkey
           }
           console.log(res)
        })
      },
      querychange(query){
        this.query=query
        //console.log(this.query)
        //console.log(query)
      },
      addquery(item){
        this.$refs.search.setquery(item.k)
      },
      select(item){
        console.log(88)
        console.log(item)
        if(item.types=="singer"){
          //说明是歌手需要跳转到歌手详情页 search-detile
          this.$router.push({path:`/search/${item.singerid}`});
          this.set_singer(item)
        }else{
          //说明点击的是歌曲
         // console.log("123")
          this.addSong(item)
        }
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.searchWrapper{
  position:fixed;
  left:0px;
  right:0px;
  top:88px;
  bottom:0px;
  .searchbox{
    width:100%;
    padding:0 20px;
    height:40px;
    box-sizing:border-box;
  }
  .bottom{
    position:absolute;
    left:0px;
    right:0px;
    top:40px;
    bottom:0px;
    .hotWrapper{
      padding:20px;
      height:auto;
      width:100%;
      li{
        padding:3px 8px;
        display:inline-block;
        border:1px solid gold;
        border-radius:10px;
        margin-right:10px;
        margin-bottom:10px;
        
      }
    }
    .suggetWrapper{
      width:100%;
      position:absolute;
      left:0px;
      top:0px;
      right:0px;
      bottom:0px;
      overflow:hidden;
    }

  }
}
</style>
