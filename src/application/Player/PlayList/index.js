import React, { memo, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { PlayListWrapper, ScrollWrapper } from './style';
import {
  changeCurrentIndexAction,
  changePlayListAction,
  changePlayModeAction,
  changeShowPlayListAction,
} from '../store';
export default memo(function PlayList(props) {
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
  const changeShowPlayListDispatch = useCallback(() => {
    dispatch(changeShowPlayListAction(false));
  }, [dispatch]);
  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      mountOnEnter
      unmountOnExit
    >
      <PlayListWrapper onClick={() => changeShowPlayListDispatch()}>
        <div className="list_wrapper">
          <ScrollWrapper></ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
});
