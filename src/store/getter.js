export const getsinger=state=>state.singer
export const getPlaying=state=>state.playing
export const getPlayList=state=>state.playList
export const getOrderPlay=state=>state.orderplay
export const getFullScreen=state=>state.fullScreen
export const getMode=state=>state.mode
export const getCurrentIndex=state=>state.currentIndex
export const getCurrentSong=state=>{
        return state.playList[state.currentIndex] ||{}
}

export const recomendSong=state=>{
        return state.recomendSong
}

export const rankSelect=state=>{
        return state.rankSelect
}
