import originjsonp from "jsonp"
export function jsonp (url,data,option){
    
    url+=(url.indexOf("?")<0?"?":"&")+params(data)
    return new Promise((resolve,reject)=>{
        originjsonp(url,option,(err,data)=>{
            if(!err){
              resolve(data)
            }else{
              reject(err)
            }
        })
    })
}

function params(data){
  let url="";
  for(var key in data){
      let value=data[key]!==undefined?data[key]:""
      url+=`&${key}=${encodeURIComponent(value)}`
  }
  return url?url.substr(1):""
}