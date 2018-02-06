<template>
<div class="progressWrapper_lay"  @click.prevent="progressClick">
    <div class="progressWrapper" ref="wrapper">
    <div class="progressing" ref="progressing"></div>
    <div class="proball" ref="proball"  
    @touchstart.prevent="touchstart"
    @touchmove.prevent="touchmove"
    @touchend.prevent="touchend"></div>
  </div>

</div>
</template>

<script type="text/ecmascript-6">
let ballWith=10;
export default {
  props:{
    percent:{
      type:Number,
      default:0
    }
  },
  created(){
    this.touch={flag:false}
  },
  data () {
    return {
      msg: ''
    }
  },
  watch:{
    percent(newPercent){
      if(newPercent>0 && !this.touch.flag){
               //监听百分比
      let w=this.$refs.wrapper.clientWidth-ballWith;
      this.$refs.progressing.style.width=w*newPercent+"px";
      this.$refs.proball.style.transform=`translate3d(${w*newPercent}px,0,0)`;

      }
    }
  },
  methods:{
   offset(offset){
    this.$refs.progressing.style.width=offset+"px"
    this.$refs.proball.style.transform=`translate3d(${offset}px,0,0)`

   },
   touchstart(e){
     this.touch.flag=true;
     this.touch.startX=e.touches[0].pageX;
     this.touch.left=this.$refs.progressing.clientWidth;
   },
   touchmove(e){
     if(!this.touch.flag){
       return 
     }
    this.touch.moveX=e.touches[0].pageX;
    let def=this.touch.moveX-this.touch.startX;
    let offset=Math.min(Math.max(0,this.touch.left+def),this.$refs.wrapper.clientWidth-ballWith);
    this.offset(offset)
   },
   touchend(e){
      this.emit()
      this.touch.flag=false;
   },
   emit(){
      let percent=this.$refs.progressing.clientWidth/(this.$refs.wrapper.clientWidth-ballWith);
      this.$emit("changePercent",percent)
   },
   progressClick(e){
      let offset=e.offsetX;
      this.offset(offset);
      this.emit();
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.progressWrapper_lay{
   position:relative;
  width:100%;
  height:16px;
  padding-top:7px;
}
.progressWrapper{
  position:relative;
  width:100%;
  height:2px;
  background:green;
  .progressing{
    position:absolute;
    left;0px;
    top:0px;
    width:0px;
    height:2px;
    background:gold;
  }
  .proball{
    position:absolute;
    left:0px;
    top:-4px;
    width:10px;
    height:10px;
    background:gold;
    border-radius:50%;
  }
}
</style>
