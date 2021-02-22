import React, { memo, useEffect, useRef, useState } from 'react';
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
const getSongPlayUrl = (id) => {
  if (!id) return '';
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
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
  const audioRef = useRef(null);
  const currentSongPlayUrl = getSongPlayUrl(currentSong.id);
  const dispatch = useDispatch();
  const changeFullScreenDispatch = useCallback(
    (data) => {
      dispatch(changeFullScreenAction(data));
    },
    [dispatch]
  );
  const changePlayingStateDispatch = useCallback(
    (data) => {
      dispatch(changePlayingStateAction(data));
    },
    [dispatch]
  );
  useEffect(() => {
    if (currentSong && audioRef.current) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  }, [currentSong]);
  useEffect(() => {
    if (audioRef.current) {
      setTimeout(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
      }, 0);
    }
  }, [playing]);
  console.log(playing);
  return (
    <div>
      {playList.length > 0 ? (
        <div>
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
          />
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
          />
        </div>
      ) : null}
      {currentSongPlayUrl && <audio ref={audioRef} src={currentSongPlayUrl} />}
    </div>
  );
});
