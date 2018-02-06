<template>
  <div class="singer" ref="singer">
    <listview :singer="singer" @selectSigner="selectSigner" ref="listview"></listview> 
    <router-view/>
  </div>
  
</template>

<script type="text/ecmascript-6">
import {getSingerList} from "@/api/singer";
import {singer} from "@/common/js/singer";
import scroll from "@/base/scroll/scroll";
import listview from "@/components/listview/listview"
import singerdetile from "@/components/singer-detile/singer-detile"
import { mapMutations } from 'vuex'
import {playlistMixin} from "@/common/js/mixin"
let HOTLENGTH=10
let HOST="热门"
export default {
  mixins: [playlistMixin],
  data () {
    return {
      singer: []
    }
  },
  created(){
    this._getsingerlist()
  },
  mounted(){
    setTimeout(()=> {
      let height=0;
      let heightAry=[];
      heightAry.push(height);
      let items=this.$refs.li_item;
    },20)
  },
  methods:{
    handlePlaylist(playlist){
        console.log(222)
        console.log("playlist22")
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.listview.$el.style.bottom = bottom
                          
        this.$refs.listview.refresh()
   },
    ...mapMutations(["set_singer"]),
    _getsingerlist(){
       getSingerList().then((res)=>{
          this.singer=this._nomorlize(res.data.list);
       })
    },
    _nomorlize(data){
      /**@augments
       * 最终的数据结构
       * [{title:热门,items:[{"name":"周杰伦"},{"name":"张杰"}]},
       * {title:z,items:[{"name":张大为}]}]
       * 
       * 
       */
        let hot=[{
          "title":HOST,
          "items":[]
        }]
        let ret={};
        data.forEach((item,index)=>{
           if(index<HOTLENGTH){
              hot[0].items.push(new singer( item))
           }else{
             let key=item.Findex
             if(!ret[key]){
               ret[key]={
                 "title":key,
                 "items":[]
               }
             }
             ret[key].items.push(new singer( item))
           }
        })
        //把ret {9:{title: "9", items: Array(1)},{A:{title: "A", items: Array(2)}}变成数组
        let retary=[];
        for(var key in ret){
          let value=ret[key];
          retary.push(value);
        }
        //retary 排序
        retary.sort((a,b)=>{
          return  a.title.charCodeAt(0)-b.title.charCodeAt(0)
        })
        let all= hot.concat(retary);
        return all

    },
    selectSigner(singer){
       this.$router.push({
         path:`/singer/${singer.singerId}`
       })
       this.set_singer(singer)
       
    }
   
    
  },
  components:{
    scroll,listview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  

.singer{
  position:fixed;
  left:0px;
  top:88px;
  right:0px;
  bottom:0px;
  overflow:hidden;
  
}
.scroll{
  width:100%;
  height:100%;
}

</style>
