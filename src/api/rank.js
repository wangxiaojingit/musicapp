import {jsonp} from "@/common/js/jsonp"
import {commonParams,options,ERR_OK} from "@/api/config"
import axios from "axios"

//歌手详情歌曲列表
export function getRank(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const data = Object.assign({}, commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })
  
    return jsonp(url, data, options)
}


export function getTopListDetail(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3
  })

  return jsonp(url, data, options)
}