<template>
  <div class="recommendWrapper" ref="recommendWrapper">
    <scroll class="scroll" :data="disclist" ref="scroll">
      <div class="recommendConent" ref="recommendConent">
        <div class="bannerWrapper">
          <slider v-if="recommends.length">
              <div  v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img class="needsclick" :src="item.picUrl" @load="loadImg">
                </a>
              </div>
          </slider>
        </div>
        <div class="hotrecommed">
          <h1 class="title">热门歌单推荐</h1>
          <ul class="songWrapper">
              <li class="song_item" v-for="item in disclist" :key="item.id" @click="selectSong(item)">
                <div class="song_icon">
                  <img width="60" height="60" v-lazy="item.imgurl"/>
                </div>
                <div class="text">
                  <h2 class="song_name" v-html="item.creator.name"></h2>
                  <p calss="song_des" v-html="item.dissname"></p>
                </div>
              
              </li>
          </ul>
        </div>
      
      </div>
    </scroll>
    <div class="loadingWrapper" v-show="!disclist.length">
      <loading></loading>
    </div>
     <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend,getDist} from "@/api/recommend"
import {ERR_OK} from "@/api/config"
import slider from "@/base/slider/slider"
import scroll from "@/base/scroll/scroll"
import loading from "@/base/loading/loading"
import {playlistMixin} from "@/common/js/mixin"
import {mapGetters,mapMutations} from "vuex"
const retHeight=50
export default {
   mixins: [playlistMixin],
  data () {
    return {
      recommends: [],
      disclist:[]
    }
  },
  computed:{
    //...mapGetters(["recomendSong"])
  },
  created(){
    this. _getRecommend();
    this._getDist();
  },
  mounted(){
      // this.BScroll=new BScroll(this.$refs.recommendWrapper,{
      //   click:true
      // })
  },
  methods:{
    ...mapMutations(["SET_RECOMENDSONG"]),
    handlePlaylist(playlist){
        console.log("playlist33")
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommendWrapper.style.bottom = bottom
        this.$refs.scroll.refresh()
   },
   selectSong(item){
      console.log("推荐歌曲")
      console.log(item)
      this.SET_RECOMENDSONG(item)
      this.$router.push({ path: `/recommond/${item.dissid}` })

   },
    _getRecommend(){
      getRecommend().then((res)=>{
         if(res.code==ERR_OK){
           this.recommends= res.data.slider;
         }
         
      })
    },
    _getDist(){
     getDist().then((res)=>{
       this.disclist=res.data.list;
     })
    },
    loadImg(){
      if(!this.imgload){
       this.imgload=true;
      // this.$refs.scroll.refresh();
      }
      
      
    }
  },
  components:{
   slider,scroll,loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.recommendWrapper{
   position:fixed;
   left:0px;
   right:0px;
   top:88px;
   bottom:0px;
   overflow:hidden;
   .scroll{
     height:100%;
     width:100%;
   }
  
}

.hotrecommed{
    font-size:12px
    .title{
      height:30px;
      line-height:30px;
      text-align:center;
      font-size:$font-size-medium-x
      color:$color-theme 
      font-weight:bold;
    
    }
    .songWrapper{
      .song_item{
        display:flex;
        align-items: center
        padding: 0 20px 20px 20px
        .song_icon{
           width:60px;
           height:60px;
        }
        .text{
          flex:1;
          display:flex;
          padding-left:20px;
          box-sizing:border-box;
          flex-direction :column;
          justify-content:center;
          line-height:20px;
          .song_name{
            flex:1
          }
          .song_des{
            flex:1
          }
        }
      }
    }
  }
.loadingWrapper{
  position:absolute;
  left:0;
  top:50%;
  transform :translateY(-50%)
  width:100%;
  
}  
</style>
