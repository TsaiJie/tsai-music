import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shuffle } from '@/api/utils';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
import Confirm from '@/baseUI/Confirm';
import { getName, prefixStyle } from '@/api/utils';
import { playMode } from '@/api/config';
import {
  changeSequenceListAction,
  deleteSongAction,
} from '../store/actionCreators';
import { Swiper } from 'swiper';
import 'swiper/swiper-bundle';
export default memo(function PlayList(props) {
  const { songReady, setSongReady } = props;
  const playListRef = useRef();
  const listWrapperRef = useRef();
  const listScrollRef = useRef();
  const lisRef = useRef([]);
  const deleteSong = useRef({});
  const confirmRef = useRef(null);
  //touchStart 后记录 y 值
  const [startY, setStartY] = useState(0);
  //touchStart 事件是否已经被触发
  const [initialed, setInitialed] = useState(0);
  // 用户下滑的距离
  const [distance, setDistance] = useState(0);
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true);
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const {
    playList,
    mode,
    currentIndex,
    currentSong,
    showPlayList,
    sequenceList,
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
  // 删除歌曲
  const deleteSongDispatch = (data) => {
    dispatch(deleteSongAction(data));
  };
  const handleDeleteSong = (e, item, current) => {
    e.stopPropagation();
    const index = playList.findIndex((song) => {
      return item.id === song.id;
    });
    deleteSong.current.index = index;
    deleteSong.current.song = item.id;
    deleteSong.current.curSong = current.id;
    deleteSongDispatch(item);
  };
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
  const clearDispatch = () => {
    // 1. 清空两个列表
    dispatch(changePlayListAction([]));
    dispatch(changeSequenceListAction([]));
    // 2. 初始 currentIndex
    dispatch(changeCurrentIndexAction(-1));
    // 3. 关闭 PlayList 的显示
    dispatch(changeShowPlayListAction(false));
    // 4. 将当前歌曲置空
    // dispatch(changeCurrentSong({}));
    // 5. 重置播放状态
    dispatch(changePlayingStateAction(false));
  };
  const resetCurrentIndex = useCallback(
    (list) => {
      let index = list.findIndex((item) => {
        return item.id === currentSong.id;
      });
      dispatch(changeCurrentIndexAction(index));
    },
    [dispatch, currentSong]
  );
  const handleChangeMode = useCallback(() => {
    const newMode = (mode + 1) % 3;
    let list = null;
    if (newMode === playMode.random) {
      list = shuffle(sequenceList);
    } else if (newMode === playMode.sequence) {
      list = sequenceList;
    } else if (newMode === playMode.loop) {
      list = sequenceList;
    }
    changeModeDispatch(newMode);
    changePlayListDispatch(list);
    resetCurrentIndex(list);
  }, [
    mode,
    sequenceList,
    resetCurrentIndex,
    changeModeDispatch,
    changePlayListDispatch,
  ]);
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
  const scrollToCurrentSong = useCallback(
    (current) => {
      let index = playList.findIndex((song) => {
        return current.id === song.id;
      });
      if (deleteSong.current.index !== undefined) {
        if (deleteSong.current.index < index) {
          console.log('前面');
          index = index - 1 < 0 ? 0 : index - 1;
        } else if (deleteSong.current.index === index) {
          if (deleteSong.current.curSong === deleteSong.current.song) {
            console.log('删除的是当前歌曲');
            // index = index - 1 < 0 ? 0 : index - 1;
          } else {
            console.log('删除的是当前歌曲前一首');
            index = index - 1 < 0 ? 0 : index - 1;
          }
        } else if (deleteSong.current.index > index) {
          console.log(
            '后面',
            deleteSong.current.index,
            index,
            deleteSong.current.song
          );
        }
      }
      const bScroll = listScrollRef.current.getBScroll();
      const liEl = lisRef.current[index] && lisRef.current[index].current;
      liEl && bScroll && bScroll.scrollToElement(liEl, 300);
    },
    [playList]
  );
  const handleShowClear = useCallback(() => {
    confirmRef.current.show();
  }, []);
  const handleConfirmClear = () => {
    clearDispatch();
  };
  const handleTouchStart = (e) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current.style['transition'] = '';
    setStartY(e.nativeEvent.touches[0].pageY); // 记录 y 值
    setInitialed(true);
  };
  const handleTouchMove = (e) => {
    if (!canTouch || !initialed) return;
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance); // 记录下滑距离
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };
  const handleTouchEnd = (e) => {
    setInitialed(false);
    // 这里设置阈值为 150px
    if (distance >= 150) {
      // 大于 150px 则关闭 PlayList
      dispatch(changeShowPlayListAction(false));
    } else {
      // 否则反弹回去
      listWrapperRef.current.style['transition'] = 'all 0.3s';
      listWrapperRef.current.style[transform] = `translate3d(0px, 0px, 0px)`;
    }
  };
  useEffect(() => {
    if (!showPlayList) return;
    scrollToCurrentSong(currentSong);
  }, [currentSong, showPlayList, scrollToCurrentSong]);
  // 是否允许滑动事件生效
  
  const handleScroll = useCallback((pos) => {
    // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
    let state = pos.y === 0;
    setCanTouch(state);
  }, []);
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1
              className="title"
              onClick={(e) => {
                handleChangeMode();
              }}
            >
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listScrollRef}
              onScroll={(pos) => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                <TransitionGroup>
                  {playList.map((item, index) => {
                    lisRef.current[index] = React.createRef();
                    return (
                      <CSSTransition
                        key={item.id}
                        timeout={200}
                        classNames="listItem"
                      >
                        <li
                          ref={lisRef.current[index]}
                          className="item"
                          onClick={(e) => handleChangeCurrentIndex(index)}
                        >
                          {getCurrentIcon(item)}
                          <span className="text">
                            {item.name} - {getName(item.ar)}
                          </span>
                          <span className="like">
                            <i className="iconfont">&#xe601;</i>
                          </span>
                          <span
                            className="delete"
                            onClick={(e) =>
                              handleDeleteSong(e, item, currentSong)
                            }
                          >
                            <i className="iconfont">&#xe63d;</i>
                          </span>
                        </li>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </ListContent>
            </Scroll>
          </ScrollWrapper>
          <div
            className="bottom_close"
            onClick={() => changeShowPlayListDispatch()}
          >
            关闭
          </div>
        </div>
        <Confirm
          ref={confirmRef}
          text={'是否删除全部？'}
          cancelBtnText={'取消'}
          confirmBtnText={'确定'}
          handleConfirm={handleConfirmClear}
        />
      </PlayListWrapper>
    </CSSTransition>
  );
});
