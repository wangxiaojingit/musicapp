<template>
   <scroll :data="singer" class="scroll" 
   :listenScroll="true"
   :probeType=3
   @scroll="scroll"
    ref="listview"
    >
      <ul class="content_wrapper">
        <li class="item_level1" v-for="item in singer" ref="li_item">
          <h1 class="title">{{item.title}}</h1>
          <ul>
            <li class="item_level2" v-for="singer in item.items" @click="selectsinger(singer)">
              <span class="avtor"><img width="30" height="30" v-lazy="singer.avtor" alt=""></span>
              <span class="name">{{singer.singer_name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="navleft">
       <ul @touchstart="touchStart" 
           @touchmove="touchmove"
       >
         <li v-for="(item,index ) in singer" :data-index="index" :class="{'active':index==currenIndex}">
           {{item.title.substr(0,1)}}
         </li>
       </ul>
      </div>
      <div class="title_fix" v-show="fixedTitle" ref="diffTitle">
        {{fixedTitle}}
      </div>
      <div class="loading" v-show="!singer.length">
        <loading></loading>
      </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from "@/api/singer";
import {singer} from "@/common/js/singer";
import scroll from "@/base/scroll/scroll"
import loading from "@/base/loading/loading"
import {getDate} from "@/common/js/dom"
let anchorHeight=18
export default {
  props:{
    singer:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currenIndex:0,
      y:-1,
      heightAry:[],
      diff:-1
    }
  },
  created(){
    this.touch={
       index:0
    }
  },
  computed:{
    fixedTitle(){
      if(this.y>0){
         return ""
      }
      if(this.singer.length){
         return this.singer[this.currenIndex].title
      }
    }
  },
  methods:{
      touchStart(e) {
       this.touch.pageY1=e.touches[0].pageY
       let index=getDate(e.target,"index");
       this.touch.index=index;
       this._toscroll(index);
      },
      touchmove(e){
         this.touch.pageY2=e.touches[0].pageY;
         let defIndex=(this.touch.pageY2-this.touch.pageY1) / anchorHeight |0;
         let index=defIndex+Number(this.touch.index);
         this._toscroll(index)
      },
      _toscroll(index){
        this.y=-this.heightAry[index];
       this.$refs.listview.scrollToElement(this.$refs.li_item[index],0)
      },
      scroll(pos){
          this.y= pos.y;
      },
      refresh(){
        this.$refs.listview.refresh();
      },
      _initHeight(){
        let height=0;
        this.heightAry.push(height);
        let lists=this.$refs.li_item;
        for(let i=0;i<lists.length;i++){
           let h=lists[i].clientHeight;
           height+=h;
           this.heightAry.push(height)
        }
      },
      selectsinger(singer){
       
        this.$emit("selectSigner",singer)
      }
  },
  watch:{
    singer(){
      setTimeout(() => {
        this._initHeight()
      }, 20);
      
    },
    y(newY){
           if(newY>0){
              //在顶部超过边界
              this.currenIndex=0;
              return
            }
            //在中间逻辑
            for(var i=0;i<this.heightAry.length-1;i++){
              let current=this.heightAry[i];
              let next=this.heightAry[i+1];
              if(-newY>=current && -newY<next){
                this.currenIndex=i;
                this.diff=newY+next;
               
                return
              }
            }
            this.currentIndex = this.heightAry.length - 2
    },
    diff(newdiff){
                if(newdiff>0&&newdiff<30){
                  let diffy=30-newdiff;
                  this.$refs.diffTitle.style.transform=`translate3d(0,${-diffy}px,0)`;
                }else{
                  this.$refs.diffTitle.style.transform=`translate3d(0,0px,0)`;
                }
    }
  },
  components:{
    scroll,loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus" >
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"  
* { touch-action: none; } //加这句css 就是为了解决浏览器报的下面的那个错误
//[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive.
.content_wrapper{
    .item_level1{
      h1{height:30px;line-height:30px;
        background:$color-highlight-background;
        font-size:$font-size-medium;
        padding-left:7px;
      }
      .item_level2{
         padding:10px;
         height:30px;
         span{
           display:inline-block;
         }
        .avtor{
          width:30px;
          height:30px;
          margin-right:10px;
          img{
            vertical-align :middle;
            border-radius:50%;
          }
          .name{
            vertical-align :middle
          }
        }
      }
    }
  }

.navleft{
  position:absolute;
  right:10px;
  top:25px;
  z-index:22
  li{
    padding:6px 16px;
    padding-bottom:0;
    font-size:12px;
    text-align:center;
    &.active{
    color:gold
  }
  }
  
}  
.title_fix{
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
    height: 30px;
    line-height: 30px;
    background: #333;
    font-size: 14px;
    padding-left: 7px;
    transition :all .3s linear
}
.loading{
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform :translateY(-50%)
}
</style>
