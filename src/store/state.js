 import mode from "@/common/js/config"
 let state={
    singer:[],
    playing:false,//是否正在播放
    playList:[],//播放列表
    orderplay:[],// 顺序播放
    fullScreen:false,//是不是全屏播放
    mode:mode.order ,//播放模式有三种:order 顺序播放\ loop 循环播放 random 随机播放
    currentIndex:-1 ,  //当前播放歌曲的index
    recomendSong:{},
    rankSelect:{}  //排行榜选中的歌曲
}
export default state
