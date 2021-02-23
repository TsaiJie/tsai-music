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
import { formatTime, shuffle } from '@/api/utils';
import { playMode } from '@/api/config';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [percent, setPercent] = useState(0);
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
  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setPercent(e.target.currentTime / duration);
  };
  const triggerTouchPercentChange = useCallback(
    (percent) => {
      audioRef.current.currentTime = duration * percent;
      if (!playing) {
        changePlayingStateDispatch(null, !playing);
      }
    },
    [duration, playing, changePlayingStateDispatch]
  );
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
    dispatch(changePlayModeAction(newMode));
    let list = null;

    if (mode === playMode.random) {
      list = shuffle(sequenceList);
    } else {
      list = sequenceList;
    }
    dispatch(changePlayListAction(list));
    resetCurrentIndex(list);
  }, [dispatch, mode, sequenceList, resetCurrentIndex]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      setDuration(currentSong.dt / 1000);
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
  return (
    <div>
      {playList.length > 0 ? (
        <div>
          <MiniPlayer
            song={currentSong}
            percent={percent}
            fullScreen={fullScreen}
            playing={playing}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
          />
          <NormalPlayer
            mode={mode}
            song={currentSong}
            percent={percent}
            fullScreen={fullScreen}
            playing={playing}
            songReady={songReady}
            currentTime={formatTime(currentTime)}
            duration={formatTime(duration)}
            handleChangeMode={handleChangeMode}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
            toggleNextSong={toggleNextSong}
            togglePrevSong={togglePrevSong}
            triggerTouchPercentChange={triggerTouchPercentChange}
          />
        </div>
      ) : null}
      {currentSongPlayUrl && (
        <audio
          ref={audioRef}
          src={currentSongPlayUrl}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
        />
      )}
    </div>
  );
});
