# musicapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


1\ cd 转动的问题,当歌曲播放的时候旋转,当暂停的时候cd停留在当前旋转的位置, 我们有一个
   animation-play-state:pause 的css 但是要个旋转的那个css动画类名一起使用

   @keyframes rotate{
    0%{transform:rotate(0)}
    100%{transform:rotate(360deg)}
  }

  .rotate{animation:rotate 5s linear infinite forwards}
  .pause{animation-play-state:pause}

  计算属性类名:return this.getPlaying ? "rotate":"rotate paused"