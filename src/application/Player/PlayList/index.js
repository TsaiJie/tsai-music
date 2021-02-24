import React, { memo, useCallback, useRef } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  PlayListWrapper,
  ScrollWrapper,
  ListContent,
  ListHeader,
} from './style';
import {
  changeCurrentIndexAction,
  changePlayListAction,
  changePlayModeAction,
  changeShowPlayListAction,
} from '../store';
import Scroll from '@/baseUI/Scroll';
import { getName, prefixStyle } from '@/api/utils';
export default memo(function PlayList(props) {
  const playListRef = useRef();
  const listWrapperRef = useRef();

  const {
    playList,
    sequenceList,
    mode,
    currentIndex,
    currentSong,
    showPlayList,
  } = useSelector(
    (state) => ({
      playList: state.player.playList,
      sequenceList: state.player.sequenceList,
      mode: state.player.mode,
      currentIndex: state.player.currentIndex,
      currentSong: state.player.playList[state.player.currentIndex] || {},
      showPlayList: state.player.showPlayList,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const transform = prefixStyle('transform');
  const onEnterCB = useCallback(() => {
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  const onEnteringCB = useCallback(() => {
    // 让列表展现
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);
  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s';
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);
  const onExitedCB = useCallback(() => {
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);
  const changeShowPlayListDispatch = useCallback(() => {
    dispatch(changeShowPlayListAction(false));
  }, [dispatch]);

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      appear={true}
      mountOnEnter
      unmountOnExit
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        onClick={() => changeShowPlayListDispatch()}
      >
        <div className="list_wrapper" ref={listWrapperRef}>
          <ListHeader>
            <h1 className="title">
              <div>
                <i className="iconfont">iconfont</i>
                <span className="text">text</span>
              </div>
              <span className="iconfont clear">&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li className="item" key={item.id}>
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span className="delete">
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
});
