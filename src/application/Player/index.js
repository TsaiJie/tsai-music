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
  const [songReady, setSongReady] = useState(false);
  const currentSongPlayUrl = getSongPlayUrl(currentSong.id);
  const dispatch = useDispatch();
  const changeFullScreenDispatch = useCallback(
    (data) => {
      dispatch(changeFullScreenAction(data));
    },
    [dispatch]
  );
  const changePlayingStateDispatch = useCallback(
    (e, data) => {
      if (!songReady) return;
      e && e.stopPropagation();

      dispatch(changePlayingStateAction(data));
    },
    [dispatch, songReady]
  );
  const toggleNextSong = useCallback(() => {
    if (!songReady) return;
    let index = currentIndex + 1;
    if (index === playList.length - 1) {
      index = 0;
    }
    dispatch(changeCurrentIndexAction(index));
    if (!playing) {
      changePlayingStateDispatch(null, !playing);
    }
    setSongReady(false);
  }, [
    dispatch,
    currentIndex,
    playList,
    playing,
    songReady,
    changePlayingStateDispatch,
  ]);
  const togglePrevSong = useCallback(() => {
    if (!songReady) return;
    let index = currentIndex - 1;
    if (index === -1) {
      index = playList.length - 1;
    }
    dispatch(changeCurrentIndexAction(index));
    if (!playing) {
      dispatch(changePlayingStateAction(true));
    }
    setSongReady(false);
  }, [dispatch, currentIndex, playList, playing, songReady]);
  const handleCanPlay = () => {
    setSongReady(true);
  };
  const handleError = () => {
    // 如果发生错误  canPlay不能执行，就需要error来处理
    setSongReady(true);
  };

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
            songReady={songReady}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
            toggleNextSong={toggleNextSong}
            togglePrevSong={togglePrevSong}

          />
        </div>
      ) : null}
      {currentSongPlayUrl && (
        <audio
          ref={audioRef}
          src={currentSongPlayUrl}
          onCanPlay={handleCanPlay}
          onError={handleError}
        />
      )}
    </div>
  );
});
