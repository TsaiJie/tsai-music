import React, { memo, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import { getName, prefixStyle } from '@/api/utils';
import { playMode } from '@/api/config';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
  LyricWrapper,
  LyricContainer,
} from './style';
import ProgressBar from '@/baseUI/ProgressBar';
import Scroll from '@/baseUI/Scroll';
export default memo(function NormalPlayer(props) {
  const {
    song,
    fullScreen,
    playing,
    songReady,
    currentTime,
    duration,
    percent,
    mode,
    currentLyric,
    currentPlayingLyric,
    currentLineNum,
  } = props;
  const {
    handleChangeMode,
    changeFullScreenDispatch,
    changePlayingStateDispatch,
    togglePrevSong,
    toggleNextSong,
    triggerTouchPercentChange,
  } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  const [currentState, setCurrentState] = useState('');

  const lyricScrollRef = useRef();
  const lyricLineRefs = useRef([]);
  const transform = prefixStyle('transform');

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
  // translate3d(0,0,0)是元素的当前位置
  const enter = () => {
    const { x, y, scale } = _getPosAndScale();
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
  // 离开时的动画只需要缩小并移动到左小角即可
  const leave = () => {
    if (!cdWrapperRef.current) return;
    const { x, y, scale } = _getPosAndScale();
    cdWrapperRef.current.style.transition = 'all 0.4s';
    cdWrapperRef.current.style[
      transform
    ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
  };
  // onExiting出场动画第二帧时执行
  // onExited整个动画出场结束时执行
  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    cdWrapperRef.current.style.transition = '';
    cdWrapperRef.current.style[transform] = '';
  };
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
    } else {
      content = '&#xe61b;';
    }
    return content;
  };
  const toggleCurrentState = () => {
    if (currentState !== 'lyric') {
      setCurrentState('lyric');
    } else {
      setCurrentState('');
    }
  };

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if (!bScroll) return;
    if (currentLineNum > 5) {
      // 保持当前歌词在第 5 条的位置
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);
  const renderTop = () => {
    return (
      <>
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
      </>
    );
  };
  const renderMiddle = () => {
    return (
      <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
        <CSSTransition
          timeout={400}
          classNames="fade"
          in={currentState !== 'lyric'}
        >
          <CDWrapper
            style={{
              visibility: currentState !== 'lyric' ? 'visible' : 'hidden',
            }}
          >
            <div className="cd">
              <img
                className={playing ? 'image play' : 'image play pause'}
                src={song.al.picUrl + '?param=400x400'}
                alt=""
              />
            </div>
            <p className="playing_lyric">{currentPlayingLyric}</p>
          </CDWrapper>
        </CSSTransition>
        <CSSTransition
          timeout={400}
          classNames="fade"
          in={currentState === 'lyric'}
        >
          <LyricWrapper>
            <Scroll
              ref={lyricScrollRef}
              data={currentLyric && currentLyric.lines}
            >
              <LyricContainer
                style={{
                  visibility: currentState === 'lyric' ? 'visible' : 'hidden',
                }}
                className="lyric_container"
              >
                {currentLyric ? (
                  currentLyric.lines.map((item, index) => {
                    // 每一个current也是 ref
                    lyricLineRefs.current[index] = React.createRef();
                    return (
                      <p
                        ref={lyricLineRefs.current[index]}
                        className={`text ${
                          currentLineNum === index ? 'current' : ''
                        }`}
                        key={item + index}
                      >
                        {item.txt}
                      </p>
                    );
                  })
                ) : (
                  <p className="text pure"> 纯音乐，请欣赏。</p>
                )}
              </LyricContainer>
            </Scroll>
          </LyricWrapper>
        </CSSTransition>
      </Middle>
    );
  };
  const renderBottom = () => {
    return (
      <Bottom className="bottom">
        <ProgressWrapper>
          <span className="time time-l">{currentTime}</span>
          <div className="progress-bar-wrapper">
            <ProgressBar
              percent={percent}
              triggerTouchPercentChange={triggerTouchPercentChange}
            />
          </div>
          <div className="time time-r">{duration}</div>
        </ProgressWrapper>
        <Operators>
          <div
            className="icon i-left"
            onClick={() => {
              handleChangeMode();
            }}
          >
            <i
              className="iconfont"
              dangerouslySetInnerHTML={{ __html: getPlayMode() }}
            ></i>
          </div>
          <div
            className={songReady ? 'icon i-left' : 'icon i-left disable'}
            onClick={() => togglePrevSong()}
          >
            <i className="iconfont">&#xe6e1;</i>
          </div>
          <div
            className={songReady ? 'icon i-center' : 'icon i-center disable'}
            onClick={(e) => changePlayingStateDispatch(e, !playing)}
          >
            <i
              className="iconfont"
              dangerouslySetInnerHTML={{
                __html: playing ? '&#xe723;' : '&#xe731;',
              }}
            />
          </div>
          <div
            className={songReady ? 'icon i-right' : 'icon i-right disable'}
            onClick={() => toggleNextSong()}
          >
            <i className="iconfont">&#xe718;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe640;</i>
          </div>
        </Operators>
      </Bottom>
    );
  };
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
        {renderTop()}
        {renderMiddle()}
        {renderBottom()}
      </NormalPlayerContainer>
    </CSSTransition>
  );
});
