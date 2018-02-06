 export class singer{
     constructor(item){
        this.singerId=item.Fsinger_id,
        this.singer_mid=item.Fsinger_mid,
        this.singer_name=item.Fsinger_name,
        this.avtor=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
     }
 }