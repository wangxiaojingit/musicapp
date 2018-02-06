import {jsonp} from "@/common/js/jsonp"
import {commonParams,options,ERR_OK} from "@/api/config"
import axios from "axios"

//轮播图
export function getRecommend (){
    let url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
    let data=Object.assign({},commonParams,{
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
   return jsonp(url,data,options)
}

//推荐歌单
export function getDist (){
    let url="/api/disclist"
    let data=Object.assign({},commonParams,{
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
  return  axios.get(url,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res.data)
        return res.data
    })
   
   
}
//推荐歌曲详情页

export function getSongList(disstid) {
    const url = '/api/getSongList'
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }