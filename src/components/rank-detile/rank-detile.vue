<template>
  <div class="detial">
    <music-list :songs="songs" :title="title" :bgimg="bgimg" ></music-list> 
  </div>
</template>

<script type="text/ecmascript-6">
import {getTopListDetail} from "@/api/rank";
import {Song} from "@/common/js/song";
import scroll from "@/base/scroll/scroll"
import loading from "@/base/loading/loading"
import musicList from "@/components/music-list/music-list"

import { mapGetters } from 'vuex'
let anchorHeight=18
export default {
  props:{
    
  },
  data () {
    return {
      songs:[]
    }
  },
  created(){
    if(!this.rankSelect.id){
      this.$router.push({path:`/rank`})
    }
    this. _getTopListDetail()
    
  
  },
  computed:{
     ...mapGetters(["rankSelect"]),
    title(){
      return this.rankSelect.topTitle
    },
    bgimg(){
      if(!this.songs.length){
        return this.rankSelect.picUrl
      }else{
        return this.songs[0].image
      }
      
    }
    
  },
  methods:{
    _getTopListDetail(){
      getTopListDetail(this.rankSelect.id).then((res)=>{
        if(res.code==0){
          this.songs=this._normalize(res.songlist)
        }
      })
    },
   _normalize(list){
   
     let ret=[];
     list.forEach(item => {
        item.musicData={};
        item.musicData.songid=item.data.songid
        item.musicData.songmid=item.data.songmid
        item.musicData.songname=item.data.songname
        item.musicData.albumdesc=item.data.albumdesc
        item.musicData.albumid=item.data.albumid
        item.musicData.albummid=item.data.albummid
        item.musicData.albumname=item.data.albumname
        item.musicData.interval=item.data.interval
        item.musicData.singer=item.data.singer
        if(item.musicData.albummid&&item.musicData.songid){
           let song=new Song(item.musicData);
           ret.push(song)
        }
     })
    
     return ret
   },
 
  },
  components:{
    scroll,loading,musicList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
* { touch-action: none; } //加这句css 就是为了解决浏览器报的下面的那个错误
//[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
.detial{
  position:fixed;
  left:0px;
  top:0px;
  right:0px;
  bottom:0px;
  background:$color-background;
  z-index:30 
}
</style>
