import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';

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
  return (
    <div>
      {playList.length > 0 ? (
        <div>
          {!fullScreen && <MiniPlayer />}
          {fullScreen && <NormalPlayer />}
        </div>
      ) : null}
    </div>
  );
});
