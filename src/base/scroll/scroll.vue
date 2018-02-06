<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
export default {
  props:{
    click:{
       type:Boolean,
       default:true
    },
    probeType:{
      type:Number,
      default:1
    },
    data:{
      type:Array,
      default:null
    },
    listenScroll:{
      type:Boolean,
      default:false
    },
     pullUp:{
      type:Boolean,
      default:false
    }
  
  },
  data () {
    return {
      pageY:0
    }
  },
  mounted(){
    setTimeout(()=>{
      this._initscroll();
     

    },20)
  },
  methods:{
    _initscroll(){
      if(!this.$refs.wrapper){
         return
      }
      this.Bscroll=new BScroll(this.$refs.wrapper,{
        click:this.click,
        probeType:this.probeType
      })
      if(this.listenScroll){
        this.Bscroll.on("scroll",pos=>{
           this.$emit("scroll",pos)
        })
      }
      if(this.pullUp){
        this.Bscroll.on("scrollEnd",pos=>{
           if(pos.y<=this.Bscroll.maxScrollY+50){
               this.$emit("scrollToEnd")
           }
          
        })
      }
    },
    enable(){
      if(this.Bscroll){
       this.Bscroll.enable()
      }
    },
    disable(){
      this.Bscroll&&this.Bscroll.disable()
    },
    refresh(){
     this.Bscroll&&this.Bscroll.refresh()
    },
    tijiao(){
      alert(1)
    },
    scrollToElement(){
      this.Bscroll && this.Bscroll.scrollToElement.apply(this.Bscroll, arguments)
    }
  },
  watch:{
     data(){
       setTimeout(()=>{
         this.refresh()
       },20)
     }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.wrapper{
  //overflow:hidden;
}
</style>
