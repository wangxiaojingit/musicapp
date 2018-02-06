<template>
  <div class="rankWrapper" ref="rankbox">
    <scroll class="scroll" ref="scroll">
     <ul class="rankul" v-show="rankList.length">
       <li v-for="item in rankList"  @click.prevent.stop="selectSong(item)">
         <div class="left">
           <img :src="item.picUrl"/>
         </div>
         <div class="right" >
           <span class="songitem" v-for="(a,index ) in item.songList">
            <span class="indexnum">{{index+1}}</span><span class="songName">{{a.songname}}</span> 
           </span>
         </div>
       </li>
     </ul>

    </scroll>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
import {getRank} from "@/api/rank"
import scroll from "@/base/scroll/scroll"
import {playlistMixin} from "@/common/js/mixin"
import {mapMutations} from "vuex"
export default {
  mixins:[playlistMixin],
  data () {
    return {
      rankList: []
    }
  },
  created(){
    
    getRank().then((res)=>{
       if(res.code==0){
          this.rankList=res.data.topList
       }
    })
  },
  methods:{
    ...mapMutations(["SET_RANKSELECT"]),
     handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rankbox.style.bottom = bottom
        this.$refs.scroll.refresh()
     },
     selectSong(item){
       this.$router.push({path: `/rank/${item.id}` });
       this.SET_RANKSELECT(item) 
     }
  },
  components:{
    scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
*{margin:0;padding:0}
.rankWrapper{
  position:fixed;
  left:0px;
  bottom:0px;
  right:0px;
  top:88px;
  background:#222;

  .rankul{
    padding:0 20px;
    box-sizing :border-box;
    width:100%;
    li{
      display:flex;
      margin-bottom:20px;
      .left{
        width:83px;
        flex:0 0 83px;
        height:83px;
        overflow :hidden;
        image{
          width:100%;
        }
      }
      .right{
        flex:1;
        padding:10px 15px;
        background:$color-highlight-background;
        display:flex;
        flex-direction :column;
        justify-content: center;
        font-size:12px;
        .songitem{
          flex:1;
          //line-height:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          .indexnum{
             padding:0 5px;
             width:5px;
             flex:0 0 5px;
          }
          .songName{
            flex:1;
            overflow :hidden;
            text-overflow :ellipsis;
            white-space: nowrap
          }
        }
      }
    }
  }
 
}
.scroll{width:100%;height:100%;overflow:hidden;}
</style>
