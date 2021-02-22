import { getName } from '@/api/utils';
import React, { memo } from 'react';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MiniPlayerContainer, ProgressCircle } from './style';
export default memo(function MiniPlayer(props) {
  const { song, fullScreen, playing } = props;
  const { changeFullScreenDispatch, changePlayingStateDispatch } = props;
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
              className={`play ${playing ? '' : 'pause'}`}
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
        <ProgressCircle>
          <div className="control">
            {playing ? (
              <i
                className="icon-mini iconfont icon-pause"
                onClick={(e) => changePlayingStateDispatch(e, false)}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="icon-mini iconfont icon-play"
                onClick={(e) => changePlayingStateDispatch(e, true)}
              >
                &#xe61e;
              </i>
            )}
          </div>
        </ProgressCircle>

        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
});
