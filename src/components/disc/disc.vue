<template>
  <div class="detial">
     <music-list :songs="songs" :title="title" :bgimg="bgimg" ></music-list>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSongList} from "@/api/recommend";
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
    if(!this.recomendSong.dissid){
      this.$router.push({
        path:"/recommond"
      })
    }
    //this._getsonglist();
    this._getsonglist(this.recomendSong.dissid)
  
  },
  computed:{
    ...mapGetters(["recomendSong"]),
    title(){
      return this.recomendSong.dissname
    },
    bgimg(){
      return this.recomendSong.imgurl
    }
    
  },
  methods:{
   _getsonglist(){
     getSongList(this.recomendSong.dissid).then((res)=>{
       
        if(res.code==0){
        this.songs=this._normlize(res.cdlist[0].songlist);
        }
     })
   },
   _normlize(list){
     let ret=[];

     list.forEach(item => {
        item.musicData={};
        item.musicData.songid=item.songid;
        item.musicData.songmid=item.songmid;
        item.musicData.albumdesc=item.albumdesc;
        item.musicData.songname=item.songname;
        item.musicData.albumname=item.albumname;
        item.musicData.albumid=item.albumid;
        item.musicData.interval=item.interval;
        item.musicData.singer=item.singer;
        item.musicData.albummid=item.albummid;
        if(item.musicData.albumid&&item.musicData.songid){
           let song=new Song(item.musicData)
           ret.push(song)
        }

       
     })
     console.log(ret)
     
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
