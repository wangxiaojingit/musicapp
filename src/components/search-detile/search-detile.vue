<template>
  <div class="detial">
     <music-list :songs="songs" :title="title" :bgimg="bgimg" ></music-list>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerDetail} from "@/api/singer";
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
   
    if(!this.getsinger.singerid){
      this.$router.push({
        path:"/search"
      })
    }
   this._getsonglist();
  
  },
  computed:{
    ...mapGetters(["getsinger"]),
    title(){
      return this.getsinger.singername
    },
    bgimg(){
      return this.getsinger.avtor
    }
    
  },
  methods:{
   _getsonglist(){
     getSingerDetail(this.getsinger.singermid).then((res)=>{
       if(res.data){
          let list=res.data.list;
        this.songs= this._normlize(list);
        console.log(this.songs)
       }
        
     })
   },
   _normlize(list){
     let ret=[];
     list.forEach(item => {
        let {musicData}=item
        if(musicData.albummid&&musicData.songid){
           let song=new Song(musicData)
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
