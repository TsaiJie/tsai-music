import { getName, isEmptyObject } from '@/api/utils';
import React, { memo } from 'react';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MiniPlayerContainer } from './style';
import ProgressCircle from '@/baseUI/ProgressCircle';
export default memo(function MiniPlayer(props) {
  const { song, fullScreen, playing, percent } = props;
  const {
    changeFullScreenDispatch,
    changePlayingStateDispatch,
    changeShowPlayListDispatch,
  } = props;
  const miniPlayerRef = useRef();
  const handleTogglePlayList = (e) => {
    changeShowPlayListDispatch(true);
    e.stopPropagation();
  };
  return (
    <CSSTransition
      in={!fullScreen}
      classNames="mini"
      timeout={400}
      unmountOnExit
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={(e) => changeFullScreenDispatch(true)}
      >
        {!isEmptyObject(song) ? (
          <>
            {' '}
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
            <div className="control">
              <ProgressCircle radius={32} percent={percent}>
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
              </ProgressCircle>
            </div>
            <div className="control" onClick={handleTogglePlayList}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </>
        ) : null}
      </MiniPlayerContainer>
    </CSSTransition>
  );
});
