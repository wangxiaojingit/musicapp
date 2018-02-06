 export class Song {
     constructor(musicData){
        
         this.songid=musicData.songid
         this.songmid=musicData.songmid
         this.songname=musicData.songname
         this.albumdesc=musicData.albumdesc
         this.albumid=musicData.albumid
         this.albummid=musicData.albummid
         this.albumname=musicData.albumname
         this.interval=musicData.interval
         this.singers=filterSinger(musicData.singer)
         this.image=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
         this.url=`http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
          //qq 音乐换链接,此时写死一个歌曲地址供练习
        }
 }

function filterSinger(singers){
    
    if(!singers.length){
      return ""
    }else{
      let arr=[]
      singers.forEach(item => {
        arr.push(item.name)
      })
     return arr.join("/")
    }
 }