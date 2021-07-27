# 仿网易云音乐项目 
<a href="http://1.15.227.196/" target="_blank">在线体验</a>

本项目使用的是 `react hooks` + `redux(hooks)` + `immer ` 主要技术栈。
其他技术栈包括

- 滑动组件 `@better-scroll/core`
- 图片懒加载 `react-lazyload`
- 轮播图组件 ` swiper`
- 样式 `styled-components`
- 动画 `react-transition-group`
- 异步请求 `react-redux`
- 类型检查 `prop-types`
- react 配置覆盖 `@craco/craco`

## 项目运行
后台在自己的服务器上，使用的是 `NeteaseCloudMusicApi` 项目
```powershell
yarn add # 安装依赖
yarn start  # or npm run start
```

> ps 参考神三元的网易云音乐项目，在项目过程中学到了不少的设计经验。

## 核心滑动的实现主要是基于 better-scroll 的二次封装。

## 子路由的跳转，主要是改变 zIndex 覆盖到原来的页面上。
