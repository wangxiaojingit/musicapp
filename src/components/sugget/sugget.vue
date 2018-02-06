<template>
<scroll class="scroll" :pullUp="pullUp" @scrollToEnd="scrollToEnd">
  <div class="suggetbox">
      <ul class="suggetlist" v-show="result.length">
       <li v-for="item in result" @click="select(item)">
        <div class="icon">
          <i :class="iconCls(item)"></i> 
        </div>
        <div class="name">
          <p class="text">{{item.songname||item.singername}}</p> 
        </div>
       </li>  
      </ul>
  </div>
  <loading v-show="hasMore&&hasMoreLoading" title="" class="loading" ref="loading"></loading> 
</scroll>  
</template>

<script type="text/ecmascript-6">
import searchbox from "@/components/searchbox/searchbox" 
import {Song} from "@/common/js/song";
import {search} from "@/api/search"
import scroll from "@/base/scroll/scroll"
import {mapGetters,mapMutations} from "vuex"
import loading from "@/base/loading/loading"
export default {
  props:{
    query:{
      type:String,
      default:""
    },
    showSinger:{
      type:Boolean,
      default:true
    },
    pullUp:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      page:1,
      result:[],
      hasMore:true,
      hasMoreLoading:false
    }
  },
  computed:{
   
  },
  created(){
   
    this._search()
  },
  mounted(){
    window.setTimeout(()=>{
      console.log("loading")
      
    },20)
      
    
     
  },
  components:{
    scroll,loading
  },
  methods:{
    ...mapMutations(["set_singer"]),
    _search(){
        this.hasMore=true ;
        this.hasMoreLoading=true;
         
        search(this.query,this.page,this.showSinger).then((res)=>{
          if(res.code==0){
           this.result= this._nomorlize(res.data);
           this.hasMoreLoading=false;
           this.checkMore(res.data)
          }
      })
    },
    _nomorlize(data){
       let ret=[];
       if(data.zhida&&data.zhida.singerid){
         let singer= Object.assign({"types":"singer"},data.zhida);
         singer.avtor=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.zhida.singermid}.jpg?max_age=2592000`
         console.log(singer);
         ret.push(singer)
       }
         let list=data.song.list;
         if(data.song.list.length){
                    list.forEach((item)=>{
              item.musicData={};
              item.musicData.songid=item.songid
              item.musicData.songmid=item.songmid
              item.musicData.songname=item.songname
              item.musicData.albumdesc=item.albumname_hilight
              item.musicData.albumid=item.albumid
              item.musicData.albummid=item.albummid;
              item.musicData.albumname=item.albumname
              item.musicData.interval=item.interval
              item.musicData.singer=item.singer
              if(item.musicData.albummid&&item.musicData.songid){
                let song=new Song(item.musicData);
                ret.push(song)
              }
         })

         }

       
       console.log(ret)
       return ret;
    },
    iconCls(item){
      if(item.types=="singer"){
          return "icon-mine"
      }else{
        return "icon-music"
      }
    },
    select(item){
      
      this.$emit("select",item)
    },
    checkMore(data){
      let song=data.song;
      if(song.curpage * song.curnum>=song.totalnum){
         this.hasMore=false
      }
    },
    scrollToEnd(){
      //证明滑动到了底部,
       if(this.hasMore){
          this.page++;
          this.hasMoreLoading=true;
          search(this.query,this.page,this.showSinger).then((res)=>{
              if(res.code==0){

              this.result= this.result.concat(this._nomorlize(res.data));
              this.hasMoreLoading=false;
              this.checkMore(res.data)
              }
          })
       }
    }

  },
  watch:{
    query(newquery){
       this._search()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
*{touch-action :none}
.scroll{
  width:100%;
  height:100%;
}
.loading{position:fixed;left:0px;bottom:0px;}
.suggetbox{
  .suggetlist{
    width:100%;
    padding:20px;
    box-sizing:border-box;
    li{
     width:100%;
     height:30px;
     display:flex;
     align-items :center
     .icon{
       flex:0 0 30px;
       width:30px;

     }
     .name{
       flex:1
     }
    }
  }
  
}
</style>
