import * as types from "./mutationtypes"
 const mutations={
     [types.SET_SINGER](state,singer){
       state.singer=singer
     },
     [types.SET_PLAYING](state,flag){
      state.playing=flag
    },
    [types.SET_PLAYLIST](state,list){
      state.playList=list
    },
    [types.SET_ORDERPLAY](state,list){
      state.orderplay=list
    },
    [types.SET_FULLSCREEN](state,flag){
      state.fullScreen=flag
    },
    [types.SET_MODE](state,number){
      state.mode=number
    },
    [types.SET_CURRENTINDEX](state,number){
      state.currentIndex=number
    },

    [types.SET_RECOMENDSONG](state,obj){
      state.recomendSong=obj
    },

    [types.SET_RANKSELECT](state,obj){
      state.rankSelect=obj
    },
}



export default mutations