import mode from "@/common/js/config"
import * as types from "@/store/mutationtypes"
import {shuffle} from "@/common/js/dom"
export const selectPlay=function ({commit, state},{list,index}) {
   
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_ORDERPLAY,list)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_CURRENTINDEX,index)
    commit(types.SET_MODE,mode.order)
    commit(types.SET_PLAYING,true)
}

export const selectRandomPlay=function ({commit, state},{list}) {
    let randomlist=[]
     randomlist=shuffle(list)
     commit(types.SET_MODE,mode.random)
     commit(types.SET_PLAYLIST,randomlist)
     commit(types.SET_ORDERPLAY,list)
     commit(types.SET_FULLSCREEN,true)
     commit(types.SET_CURRENTINDEX,0)
     commit(types.SET_PLAYING,true)
 }

 export const addSong=function ({commit, state},obj) {
    let playlist=state.playList.slice();
    let orderplay=state.orderplay.slice();
    let currentIndex=state.currentIndex;
    let currentSong = playlist[currentIndex]

    let index=playlist.findIndex((item)=>{
        return item.songid==obj.songid
    })
    currentIndex++
    playlist.splice(currentIndex,0,obj);
    if(index>-1){
       //说明有这首歌曲,就得删除
       if(index>currentIndex){
           //说明原来的那首歌曲在当前这首歌曲的后面
           playlist.splice(index+1,1)
       }else{
         playlist.splice(index,1);
         currentIndex--
       }
    }

    let orderIndex=orderplay.findIndex(item =>{
        return item.songid==currentSong.songid
    })
    
    let findIndex=orderplay.findIndex((item)=>{
        return item.songid==obj.songid
    })
    orderIndex++;
    orderplay.splice(orderIndex,0,obj);
    
    if(findIndex>-1){
       //说明原来里面有,
       if(findIndex>orderIndex){
        orderplay.splice(findIndex+1,1)
       }else{
        orderplay.splice(findIndex,1);
       }
    }
    
   // commit(types.SET_MODE,mode.random)
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_ORDERPLAY,orderplay)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_CURRENTINDEX,currentIndex)
    commit(types.SET_PLAYING,true)
   
 }

