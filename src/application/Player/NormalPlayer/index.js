import React, { memo } from 'react';
import { getName } from '@/api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from './style';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
export default memo(function NormalPlayer(props) {
  const { song, fullScreen } = props;
  const { changeFullScreenDispatch } = props;
  console.log('normal', song);
  console.log('normal', fullScreen);
  const normalPlayerRef = useRef();
  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onExited={() => {
        normalPlayerRef.current.style.display = 'none';
      }}
      onEntered={() => {
        normalPlayerRef.current.style.display = 'block';
      }}
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
      </NormalPlayerContainer>
    </CSSTransition>
  );
});
