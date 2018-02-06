<template>
  <div class="songlistWrapper">
    <div class="songContent">
      <ul>
        <li class="song_item" v-for="(item,index ) in songs" @click="selectSong(item,index)">
           <div class="singerName">{{item.songname}}</div>
           <div class="songName">{{item.singers}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


import { mapGetters } from 'vuex'

export default {
  props:{
    songs:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  mounted(){
    this.$nextTick(()=>{
       console.log(this.songs)
    })
    
  },
  methods:{
   selectSong(item,index){
     this.$emit("selectSong",item,index)
   }
  
 
  },
  components:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
* { touch-action: none; } //加这句css 就是为了解决浏览器报的下面的那个错误
//[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
.songlistWrapper{
   .songContent{
     ul{
       .song_item{
         padding-top:24px;
         font-size:14px;
         padding-left:22px;
         box-sizing:border-box;
         
         .songName{
            color:#656565;
            line-height:18px;

         }
         .singerName{
           color:#fff;
           
            line-height:18px;
         }
       }
     }
   }

}
</style>
