<template>
  <div class="musiclistWrapper">
    <div class="back" @click="back">
       <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bgimg" :style="bgstyle" ref="avtor">
      <div  class="playbut" ref="playbut" v-show="songs.length" @click="random">
        <div class="play">
            <i class="icon-play"></i>
            <span>随机播放</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll class="songlistbox" ref="scroll" 
    :probeType="3" 
    :listenScroll="true"
    @scroll="scroll"
    >
      <song-list @selectSong="selectSong" :songs="songs"></song-list>
    </scroll>
     <loading ref="loading" class="loadbox" v-show="!songs.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">

import scroll from "@/base/scroll/scroll"
import loading from "@/base/loading/loading"
import songList from "@/components/song-list/song-list"

import mode from "@/common/js/config"
import { mapGetters,mapMutations,mapActions} from 'vuex'
import {playlistMixin} from "@/common/js/mixin"
const retHeight=50
export default {
  mixins: [playlistMixin],
  props:{
    songs:{
      type:Array,
      default(){
        return []
      }
    },
    title:{
      type:String,
      defalut:""
    },
    bgimg:{
       type:String,
      defalut:""
    }
  },
  data () {
    return {
     
    }
  },
  created(){
    
  },
  mounted(){
      setTimeout(()=>{
        if(this.$refs.avtor){
          let avtorHeight=this.$refs.avtor.clientHeight;
          this.avtorHeight=avtorHeight
         this.$refs.scroll.$el.style.top=avtorHeight+"px";
        }
      },20)

  },
  
  computed:{
    ...mapGetters(["getsinger","getPlayList"]),

    bgstyle(){
     
      return `background-image:url(${this.bgimg})`
    }
    
  },
  methods:{
   ...mapActions(["selectPlay","selectRandomPlay"]),
   ...mapMutations(["SET_PLAYLIST","SET_ORDERPLAY","SET_FULLSCREEN","SET_MODE","SET_CURRENTINDEX","SET_PLAYING"]), 
   handlePlaylist(playlist){
        console.log("playlist")
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
   },
   back(){
     this.$router.push({
       path:'/singer'
     })
   },
   scroll(pos){
      this.scrollY=pos.y;
      let index=0;
      let maxScrollY=Math.max(-(this.avtorHeight-retHeight),this.scrollY)
      this.$refs.layer.style.transform=`translate3d(0,${maxScrollY}px,0)`
      let percent=this.scrollY/this.avtorHeight;
      let scale=1
      if(this.scrollY>0){
         //下拉的时候图片放大
         scale=1+percent;
      }else{
         let blur=Math.min(-20*percent,20);
         this.$refs.avtor.style.backdropFilter=`blur(${blur}px)`
      }
      this.$refs.avtor.style.transform=`scale(${scale})`
      if(-this.scrollY>this.avtorHeight-retHeight){
         index=10
         this.$refs.avtor.style.paddingTop="0";
         this.$refs.avtor.style.height=retHeight+"px";
         this.$refs.playbut.style.display="none"
      }else{
         this.$refs.avtor.style.paddingTop="70%";
         this.$refs.avtor.style.height="0";
          this.$refs.playbut.style.display="block"
      }
      this.$refs.avtor.style.zIndex=index;
   },
   selectSong(item,index){
      this.selectPlay({
        list:this.songs,
        index:index
        })
     
   },
   random(){
     this.selectRandomPlay({
       list:this.songs
     })
   }
  },
  components:{
    scroll,loading,songList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
* { touch-action: none; } //加这句css 就是为了解决浏览器报的下面的那个错误
//[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
.musiclistWrapper{
   position:fixed;
   left:0px;
   right:0px;
   top:0px;
   bottom:0px;
   .back{
     position:absolute;
     left:0px;
     top:0px;
     padding: 10px;
    margin-top: 10px;
     z-index:16;
     font-size:0px;
     i{
       font-size:18px;
       vertical-align :top
     }
   }
   .title{
      position:absolute;
      width:100%;
      height:60px;
      line-height:60px;
      font-size:18px;
      text-align:center;
      left:0px;
      top:0px;
      z-index:15
   }
   .bgimg{
     position:relative;
     width:100%;
     height:0;
     padding-top:70%;
     background-size:100%;
       .playbut{
          position:absolute;
          left:0px;
          bottom:30px;
          width:100%;
          z-index:9999
          .play{
            width: 135px
          padding: 7px 0
          margin: 0 auto
          border: 1px solid $color-theme
          color: $color-theme
          border-radius:100px;
          text-align:center
          }
        }
     .filter{
       width:100%;
       height:100%;
       position:absolute;
       left:0px;
       top:0px;
       background:$color-highlight-background;
       opacity :0.3
     }
   }
   .layer{
      position: relative
      height: 100%
      background: $color-background;

    }  
   .songlistbox{
     position:fixed;
     left:0px;
     top:0px;
     right:0px;
     bottom:0px;
     
   }
   .loadbox{
     width: 100%;
    text-align: center;
    position: absolute;
    left: 0px;
    top: 50%;
    z-index:999;
    transform:translateY(-50%)

   }
}
</style>
