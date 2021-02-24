import React, { memo, useCallback, useEffect, useRef } from 'react';
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
  changePlayingStateAction,
} from '../store';
import Scroll from '@/baseUI/Scroll';
import { getName, prefixStyle } from '@/api/utils';
import { playMode } from '@/api/config';
export default memo(function PlayList(props) {
  const { songReady, setSongReady } = props;
  const playListRef = useRef();
  const listWrapperRef = useRef();
  const listScrollRef = useRef();
  const lisRef = useRef([]);
  const {
    playList,
    sequenceList,
    mode,
    currentIndex,
    currentSong,
    showPlayList,
    playing,
  } = useSelector(
    (state) => ({
      playList: state.player.playList,
      sequenceList: state.player.sequenceList,
      mode: state.player.mode,
      currentIndex: state.player.currentIndex,
      currentSong: state.player.playList[state.player.currentIndex] || {},
      showPlayList: state.player.showPlayList,
      playing: state.player.playing,
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
  // 修改当前歌曲在列表中的 index，也就是切歌
  const changeCurrentIndexDispatch = useCallback(
    (data) => {
      dispatch(changeCurrentIndexAction(data));
    },
    [dispatch]
  );
  // 修改当前的播放模式
  const changeModeDispatch = useCallback(
    (data) => {
      dispatch(changePlayModeAction(data));
    },
    [dispatch]
  );
  // 修改当前的歌曲列表
  const changePlayListDispatch = useCallback(
    (data) => {
      dispatch(changePlayListAction(data));
    },
    [dispatch]
  );
  const changePlayingStateDispatch = useCallback(() => {
    dispatch(changePlayingStateAction(true));
  }, [dispatch]);
  const handleChangeCurrentIndex = (index) => {
    if (!songReady) return;
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
    changePlayingStateDispatch();
    setSongReady(false);
  };
  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    // 具体逻辑比较复杂 后面来实现
  };
  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
      text = '顺序播放';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
      text = '单曲循环';
    } else {
      content = '&#xe61b;';
      text = '随机播放';
    }
    return (
      <div>
        <i className="iconfont" dangerouslySetInnerHTML={{ __html: content }} />
        <span className="text">{text}</span>
      </div>
    );
  };
  const getCurrentIcon = (item) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;' : '';
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };
  const scrollToCurrentSong = (current) => {
    const index = playList.findIndex((song) => {
      return current.id === song.id;
    });
    const bScroll = listScrollRef.current.getBScroll();
    const liEl = lisRef.current[index].current;
    console.log(bScroll,"执行啦");
    bScroll && bScroll.scrollToElement(liEl, 300);
  };
  useEffect(() => {
    
    if (!showPlayList) return;
    scrollToCurrentSong(currentSong);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, showPlayList]);

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
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear">&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll ref={listScrollRef} >
              <ListContent>
                {playList.map((item, index) => {
                  lisRef.current[index] = React.createRef();
                  return (
                    <li
                      ref={lisRef.current[index]}
                      className="item"
                      key={item.id}
                      onClick={(e) => handleChangeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
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
