 function hasClass(el,classname){
    let className=el.className;
    let reg=new RegExp('(^|\\s)'+classname+'(\\s|$)');
   return reg.test(className)
}

export function addClass(el,classname){
   if(hasClass(el,classname)) {
       return
   }
   let classnamestr=el.className;
   let classnamearry=classnamestr.split(" ");
   classnamearry.push(classname);
   el.className=classnamearry.join(" ")

}

export function getDate(el,name,val){
    let pre="data-"
    if(val=="undefined"||val==null){
      //说明没有传val
     return   el.getAttribute(pre+name)
    }else{
      return  el.setAttribute(pre+name,val)
    }
}

function random(min, max) {
    if (max == null) {
    max = min;
    min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};
export function shuffle(arr) {
    var length = arr.length,
    shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
    rand = random(0, index);
    if (rand !== index) shuffled[index] = shuffled[rand];
    shuffled[rand] = arr[index];
    }
    return shuffled;
}