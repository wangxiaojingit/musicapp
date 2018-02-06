import {jsonp} from "@/common/js/jsonp"
import {commonParams,options,ERR_OK} from "@/api/config"
import axios from "axios"

//歌手列表
export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
        g_tk:1928093487,
        inCharset:"utf-8",
        outCharset:"utf-8",
        notice:0,
        format:"jsonp",
        channel:"singer",
        page:"list",
        key:"all_all_all",
        pagesize:100,
        pagenum:1,
        hostUin:0,
        needNewCode:0,
        platform:"yqq",
       
    });
    
  
    return jsonp(url, data, options)
  }

  //歌手详情歌曲列表
  export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({}, commonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
      singermid: singerId
    })
  
    return jsonp(url, data, options)
  }
  
  




  //推荐歌单
// export function getDist (){
//     let url="/api/disclist"
//     let data=Object.assign({},commonParams,{
//         platform: 'yqq',
//         hostUin: 0,
//         sin: 0,
//         ein: 29,
//         sortId: 5,
//         needNewCode: 0,
//         categoryId: 10000000,
//         rnd: Math.random(),
//         format: 'json'
//     })
//   return  axios.get(url,{
//         params:data
//     }).then((res)=>{
//         return Promise.resolve(res.data)
//         return res.data
//     })
   
   
// }