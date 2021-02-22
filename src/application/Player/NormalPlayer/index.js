import React, { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import { getName } from '@/api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from './style';
export default memo(function NormalPlayer(props) {
  const { song, fullScreen } = props;
  const { changeFullScreenDispatch } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

  const _getPosAndScale = () => {
    const miniPlayerImgWidth = 40;
    // miniPlayerImg中心到屏幕左边的距离
    const paddingLeft = 40;
    // miniPlayerImg中心到屏幕下边的距离
    const paddingBottom = 30;
    // cd上边距离屏幕上边的距离
    const paddingTop = 125;
    // cd的宽度
    const cdWidth = window.innerWidth * 0.8;
    // 初始的缩放比例
    const scale = miniPlayerImgWidth / cdWidth;
    // 横向需要移动的距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    // 纵向需要移动的距离
    const y = window.innerHeight - paddingTop - cdWidth / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  // onEnter入场动画第一帧时执行
  const enter = () => {
    const { x, y, scale } = _getPosAndScale();
    console.log(x, y, scale);
    // 定义动画
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`,
      },
    };
    // 注册动画
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    // 运行动画
    animations.runAnimation(cdWrapperRef.current, 'move');
  };
  // onEntering当入场动画执行到第二帧时执行
  // onEntered 入场动画结束时触发的钩子
  const afterEnter = () => {
    animations.unregisterAnimation('move');
    cdWrapperRef.current.style.animation = '';
  };
  // onExit出场动画第一帧时执行
  const leave = () => {};
  // onExiting出场动画第二帧时执行
  // onExited整个动画出场结束时执行
  const afterLeave = () => {};

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      // 当mountOnEnter 为true时，会在第一次in属性为true时加载子组件
      mountOnEnter
      appear={true}
      unmountOnExit
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + '?param=300x300'}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div
            className="back"
            onClick={() => {
              changeFullScreenDispatch(false);
            }}
          >
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={song.al.picUrl + '?param=400x400'}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
});
