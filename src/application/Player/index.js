import { isEmptyObject } from '@/api/utils';
import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  changeCurrentIndexAction,
  changeFullScreenAction,
  changePlayListAction,
  changePlayModeAction,
  changePlayingStateAction,
  changeSequenceListAction,
} from './store';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { useCallback } from 'react';

export default memo(function Player() {
  const {
    playing,
    fullScreen,
    playList,
    sequenceList,
    mode,
    currentIndex,
    currentSong,
  } = useSelector(
    (state) => ({
      playing: state.player.playing,
      fullScreen: state.player.fullScreen,
      playList: state.player.playList,
      sequenceList: state.player.sequenceList,
      mode: state.player.mode,
      currentIndex: state.player.currentIndex,
      currentSong: state.player.playList[state.player.currentIndex] || {},
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const changeFullScreenDispatch = useCallback(
    (data) => {
      dispatch(changeFullScreenAction(data));
    },
    [dispatch]
  );
  return (
    <div>
      {playList.length > 0 ? (
        <div>
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            changeFullScreenDispatch={changeFullScreenDispatch}
          />
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            changeFullScreenDispatch={changeFullScreenDispatch}
          />
        </div>
      ) : null}
    </div>
  );
});
