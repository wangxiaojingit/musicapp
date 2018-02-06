<template>
  <div class="slider" ref="slider">
    <div class="sliderGroup" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot_item" :class="{'active':key==currentPage}" v-for="(item,key ) in dot"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Bscroll from "better-scroll"
import {addClass} from "@/common/js/dom"
export default {
  props:{
    loop:{
      type:Boolean,
      default:true
    },
    autoPlay:{
      type:Boolean,
      default:true
    },
    interval:{
      type:Number,
      default:3000
    },
    showdot:{
       type:Boolean,
       default:true
    },
    click:{
       type:Boolean,
       deafult:true
    },
    threshold: {
        type: Number,
        default: 0.3
      },
    speed: {
        type: Number,
        default: 400
    }
    
  },
  data () {
    return {
      dot: [],
      children:0,
      currentPage:0
    }
  },
  mounted(){
    setTimeout(()=>{
       this. _initsliderGroupWidth();
       this._initscroll()
       if(this.showdot){
          this._initdot()
       }
    },20)
    window.addEventListener("resize",()=>{
       this._initsliderGroupWidth(true)
       this.refresh()
    })
    
  },
  methods:{
    _initsliderGroupWidth(resize){
       let width=this.$refs.slider.clientWidth;
       let children=this.$refs.sliderGroup.children;
       this.children=children.length;
       for(var i=0;i<children.length;i++){
          children[i].style.width=width+"px";
          addClass(children[i],"slider-item")
       }
       if(this.loop&&!resize){
        this.$refs.sliderGroup.style.width=width*(children.length+2)+"px";
       }else{
        this.$refs.sliderGroup.style.width=width*children.length+"px";
       }
       
    },
    _initscroll(){
      this.slider=new Bscroll(this.$refs.slider,{
         scrollX: true,
         scrollY:false,
         click:this.click,
         momentum:false,//关掉快速滑动动画
         snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
         }
      })
      this.slider.on("scrollEnd",this._onScrollEnd)
      if(this.autoPlay){
         clearTimeout(this.timer)
         this._play()
      }
      //beforeScrollStart 代表手动拖动开始的时候
      this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
      })
    },
    _initdot(){
       this.dot=new Array(this.children)
    },
    _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPage = pageIndex
        if (this.autoPlay) {
          this._play()
        }
    },
    next(){
      this.slider.next()
    },
    prev(){
      this.slider.prev()
    },
    refresh(){
      this.slider.refresh()
    },
    _play(){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      
    }
  },
  destoryed(){
    clearTimeout(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
.slider{
  position:relative
  .sliderGroup{
    overflow :hidden;
    white-space:nowrap;
    .slider-item{
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a{
        display: block
          width: 100%
          overflow: hidden
          text-decoration: none
          img{
            width:100%
          }
      }
    }
  }
  .dots{
    position:absolute;
    right:0px;
    left:0px;
    text-align:center;
    bottom:12px;
    .dot_item{
      display:inline-block; 
      width:8px;
      height:8px;
      border-radius:50%;
      background:$color-text-l;
      margin:0 4px;
      &.active{
        background:green;
      }
    }
  }
}
</style>
