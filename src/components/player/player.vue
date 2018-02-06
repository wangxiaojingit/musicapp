<template>
  <div class="playWrapper" v-show="getPlayList&&getPlayList.length">
      <transition name="big">
       <div class="bigplayer" v-show="getFullScreen">
          <div class="background">
             <img width="100%" height="100%" :src="getCurrentSong.image" >
          </div>
          <div class="top">
             <div class="back"  @click="hide"><i class="icon-back"></i></div>
             <div class="songMessage">
                <div class="songName" v-html="getCurrentSong.songname"></div>
                <div class="singer" v-html="getCurrentSong.singers"></div>
             </div>  
          </div>
          <div class="middle">
            <div class="cdWrapper" :class="rotateState">
               <img width="230" height="230" class="cd"  alt="" :src="getCurrentSong.image">
            </div>
          </div>
          <div class="bottom">
            <div class="page">
              <span></span>
              <span></span>
            </div>
            <div class="progress">
              <span class="time">{{time(playTime)}}</span>
              <div class="progressIn">
                <progressbar 
                :percent="percent"
                @changePercent="changePercent"
                ></progressbar>
              </div>
              <div class="totalTime">{{time(getCurrentSong.interval)}}</div>
            </div>
            <div class="contorl">
              <span class="iconMode" :class="iconModecls" @click.prevent="changeMode"></span>
              <span class="icon-prev" @click="prev"></span>
              <!-- icon-pause  -->
              <span :class="iconPlayState" @click="togglePlay"></span>
              <span class="icon-next" @click="next"></span>
              <span class="icon-not-favorite"></span>
            </div>
          </div>
       </div>
      </transition> 
      <transition name="min">
       <div class="minplayer" @click="show()"  v-show="!getFullScreen"  >
         <span class="minicdWrapper" :class="rotateState"><img class="minicd" :src="getCurrentSong.image" alt=""></span>
         <div class="song">
           <div class="songname" v-html="getCurrentSong.songname"></div>
           <div class="singername" v-html="getCurrentSong.singers"></div>
         </div>
         <div class="playIcon"  @click.stop="togglePlay"><i :class="iconPlayState" ></i></div>
         <div class="playMode"><i class="icon-playlist"></i></div>
       </div>
      </transition>  
      <audio :src="getCurrentSong.url" ref="audio" 
      @canplay="ready" 
      @error="error"
      @timeupdate="timeupdate"
      @ended="end"
      ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations, mapActions} from 'vuex'
import mode from "@/common/js/config"
import progressbar from "@/components/progress/progress"
import {shuffle} from "@/common/js/dom"
import {getLyric} from "@/api/song"
export default {
  data () {
    return {
      flag: false,
      playTime:0,
      percent:0
    }
  },
  created(){
  },

  computed:{
    ...mapGetters(["getPlayList","getFullScreen","getCurrentSong","getPlaying",
    "getCurrentIndex","getMode","getOrderPlay"]),
    iconPlayState(){
      return this.getPlaying ? "icon-pause":"icon-play"
    },
    miniIconPlayState(){
      return this.getPlaying ? "icon-pause-mini":"icon-play-mini"
    },
    rotateState(){
      return this.getPlaying ? "rotate":"rotate paused"
    },
    iconModecls(){
      return  this.getMode==mode.order?"icon-sequence":this.getMode==mode.loop?"icon-loop":"icon-random"
    }
  },
  mounted(){
    
  },
  methods:{
    ...mapMutations(["SET_FULLSCREEN","SET_PLAYING","SET_CURRENTINDEX","SET_MODE"
    ,"SET_PLAYLIST"]),
    hide(){
       this.SET_FULLSCREEN(false)
    },
    show(){
      this.SET_FULLSCREEN(true)
    },
    togglePlay(){
      this.SET_PLAYING(!this.getPlaying)
    },
    prev(){
      if(!this.flag){
        return 
      }
      let num=this.getCurrentIndex;
      let songs=this.getPlayList;
      if(num==0){
        num=songs.length-1;
      }else if(num==songs.length-1){
        num=0
      }else{
        num--
      }
      this.SET_CURRENTINDEX(num);
      this.SET_PLAYING(true);
      this.flag=false
    },
    next(){
      if(!this.flag){
        return 
      }
      let num=this.getCurrentIndex;
      let songs=this.getPlayList;
      if(songs.length==1){
        this.$refs.audio.currentTime=0;
        this.$refs.audio.play();
      }
      if(num==songs.length-1){
         num=0
      }else{
        num++
      }
      this.$refs.audio.currentTime=0;
      this.SET_CURRENTINDEX(num);
      this.SET_PLAYING(true);
      this.flag=false
    },
    end(){
      if(this.getMode==mode.loop){
        this.$refs.audio.currentTime=0;
        this.$refs.audio.play();
      }else{
         this.next();
      }
     
    },
    ready(){
      this.flag=true;
     
    },
    error(){
       this.flag=true
    },
    time(times){
      let valM=Math.floor(times/60);
      let valS=Math.floor(times%60);
      let minutes=this.double(valM,2);
      let seconds=this.double(valS,2);
      return `${minutes}:${seconds}`
    },
    double(val,n){
      
       let m=val.toString().length;
       while(m<n){
          val="0"+val;
          m++;
       }
       return val;
    },
    timeupdate(){
     this.playTime=this.$refs.audio.currentTime;
     
    },
    changePercent(percent){
       this.$refs.audio.currentTime=this.getCurrentSong.interval*percent;
       if(!this.getPlaying){
         this.SET_PLAYING(true)
       }

       
    },
    changeMode(){
      let currentSong=this.getCurrentSong
      //改变mode的值
      let  mode1=this.getMode;
      mode1++;
      if(mode1==mode.random+1){
        mode1=0
      }
       this.SET_MODE(mode1);
       let songListAry=[];
      
      if(mode1==2){
        songListAry=shuffle(this.getOrderPlay)
      }else{
        songListAry=this.getOrderPlay
      }
      let index=this.getIndex(songListAry)
      this.SET_PLAYLIST(songListAry);
      this.SET_CURRENTINDEX(index);
      
    },
    getIndex(list){
        return  list.findIndex((item)=>{
            return item.songid==this.getCurrentSong.songid;
         })
    }
  },
  watch:{
    getCurrentSong(newSong){
      this.$nextTick(()=>{
         this.$refs.audio.play()
      })
      //获取歌词
      getLyric(newSong.songmid)
    },
    getPlaying(newPlayState){
      this.$nextTick(()=>{
        newPlayState?this.$refs.audio.play():this.$refs.audio.pause()
      })
    },
    playTime(newTime){
      //监听到歌曲时间更新
      this.percent=newTime/this.getCurrentSong.interval
    }

  },
  components:{
   progressbar 
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
*{touch-action: none;}
.playWrapper{
    .bigplayer{
       position:fixed;
       left:0px;
       right:0px;
       top:0px;
       bottom:0px;
      background:#222;
      &.big-enter-active,&.big-leave-active{
        transition: all 0.4s;
        .top,.bottom{
          transition:all .4s cubic-bezier(0.86,0.18,.82,1.32)
        }
      }
      &.big-enter,&.big-leave-to{
        opacity:0
        .top{
          transform:translate3d(0,-100%,0)
        }
        .bottom{
          transform:translate3d(0,100%,0)
        }
      }
      .background{
        width:100%;
        height:100%;
        img{
          filter:blur(100px)
        }
      }
      .top{
         width:100%;
         height:53px;
         position:absolute;
         left:0px;
         top:0px;
        .back{
          position:absolute;
          left:0px;
          top:0px;
          padding:10px;
          z-index:10
        }
        .songMessage{
          position:absolute;
          left:0px;
          top:0px;
          height:53px;
          line-height:53px;
          text-align:center;
          width:100%
        }

      }
      .middle{
        position:absolute;
        left:0px;
        top:100px;
        width:100%;
        height:230px;
        text-align:center;
        .cdWrapper{
           width:230px;
           height:230px;
           margin:0 auto;
           border:3px solid #333;
           border-radius:50%;
           overflow:hidden;
           &.rotate{
             animation :rotate 5s linear infinite forwards;
           }
           &.paused{
             animation-play-state: paused
           }
           img{
            //-moz-animation-timing-function border-radius:50%;
           }
        }
      }
      .bottom{
        position:absolute;
        left:0px;
        bottom:30px;
        width:100%;
        .page{
          width:100%;
          height:20px;
          text-align:center;
          span{
            display:inline-block;
            width:10px;
            height:10px;
            border-radius:50%;
            margin-right:10px;
            background:#fff;
          }
        }
        .contorl{
          padding:30px;
          display:flex;
          
          font-size:24px
          span{
            flex:1;
            text-align:center;
          }
        }
        .progress{
           padding:0 25px;
           box-sizing:border-box;
           display:flex;
           .time{
             padding:0 10px;
             display:inline-block
           }
           .totalTime{
             padding:0 10px;
             display:inline-block
           }
           .progressIn{
             display:inline-block;
             flex:1;
           }
        }

      }
    }
    .minplayer{
      position:fixed;
      left:0;
      bottom:0px;
      display:flex;
      width:100%;
      padding:10px;
      background:$color-highlight-background
      &.min-enter-active,&.min-leave-active{
        transition:all .4s cubic-bezier(0.86,0.18,.82,1.32)
      }
      &.min-enter,&.min-leave-to{
        opacity:0
      }
      .minicdWrapper{
        flex:0 0 40px;
        width:40px;
        height:40px;
        overflow:hidden;
        border-radius:50%;
        font-size:0px;
        margin-right:15px;
        &.rotate{
             animation :rotate 5s linear infinite forwards;
           }
        &.paused{
             animation-play-state: paused
        }
        img{
          width:100%;
          height:100%;
          vertical-align :top;
        }
      }
      .song{
        flex:1
        display:flex;
        flex-direction :column;
        justify-content:center;
        font-size:12px;
        .songname{
          flex:1
          line-height:20px;
        }
        .singername{
          flex:1
          line-height:20px;
        }

      }
      .playIcon{
        flex:0 0 30px;
        height:40px;
        width:30px;
        padding-top: 8px;
        box-sizing: border-box;
        margin-right:10px;
        .icon-pause,.icon-play{
          font-size:24px;
        }

      }
      .playMode{
        flex:0 0 30px;
        width:30px;
        height:40px;
        padding-top: 8px;
        box-sizing: border-box;
        margin-right:10px;
        .icon-playlist{
          font-size:24px;
        }
      }

    }
  }

  @-webkit-keyframes rotate{
    0%{transform:rotate(0)}
    100%{transform:rotate(360deg)}
  }
  @keyframes rotate{
    0%{transform:rotate(0)}
    100%{transform:rotate(360deg)}
  }
</style>
