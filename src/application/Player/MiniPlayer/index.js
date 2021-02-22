import { getName } from '@/api/utils';
import React, { memo } from 'react';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MiniPlayerContainer } from './style';
export default memo(function MiniPlayer(props) {
  const { song, fullScreen, changeFullScreenDispatch } = props;
  const miniPlayerRef = useRef();
  return (
    <CSSTransition
      in={!fullScreen}
      classNames="mini"
      timeout={400}
      unmountOnExit
      // onEnter={() => {
      //   miniPlayerRef.current.style.display = 'flex';
      // }}
      // onExited={() => {
      //   miniPlayerRef.current.style.display = 'none';
      // }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={(e) => changeFullScreenDispatch(true)}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className="play"
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
});
