import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  changeCurrentIndexAction,
  changeFullScreenAction,
  changePlayListAction,
  changePlayModeAction,
  changePlayingStateAction,
  changeShowPlayListAction,
} from './store';
import Lyric from '@/api/lyric-parser';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { formatTime, shuffle } from '@/api/utils';
import { playMode } from '@/api/config';
import { getLyricRequest } from '@/api/lyric';
import PlayList from './PlayList';
import Toast from '@/baseUI/Toast';
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
      showPlayList: state.player.showPlayList,
    }),
    shallowEqual
  );
  const audioRef = useRef(null);
  const [songReady, setSongReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [percent, setPercent] = useState(0);
  const currentLyric = useRef(null);
  const currentLineNum = useRef(0);
  const [currentPlayingLyric, setPlayingLyric] = useState('');
  const [modeText, setModeText] = useState('');
  const toastRef = useRef();
  const currentSongPlayUrl = getSongPlayUrl(currentSong.id);
  const dispatch = useDispatch();
  const [preSong, setPreSong] = useState({});
  const changeShowPlayListDispatch = useCallback(
    (data) => {
      dispatch(changeShowPlayListAction(data));
    },
    [dispatch]
  );
  const changeFullScreenDispatch = useCallback(
    (data) => {
      dispatch(changeFullScreenAction(data));
    },
    [dispatch]
  );
  const changePlayingStateDispatch = useCallback(
    (e, data) => {
      dispatch(changePlayingStateAction(data));
      if (!songReady) return;
      e && e.stopPropagation();
      if (currentLyric.current) {
        currentLyric.current.togglePlay(currentTime * 1000);
      }
    },
    [dispatch, songReady, currentTime]
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
  const handleCanPlay = (e) => {
    setSongReady(true);
  };
  const handleError = () => {
    alert('该音乐是VIP音乐或者播放url出现404错误，我们不能访问，报错');
    // 如果发生错误  canPlay不能执行，就需要error来处理
    setSongReady(true);
    changePlayingStateDispatch(null, false);
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
      if (currentLyric.current) {
        currentLyric.current.seek(duration * percent * 1000);
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
    let list = null;
    if (newMode === playMode.random) {
      setModeText('随机播放');
      list = shuffle(sequenceList);
    } else if (newMode === playMode.sequence) {
      setModeText('顺序播放');
      list = sequenceList;
    } else if (newMode === playMode.loop) {
      setModeText('单曲循环');
      list = sequenceList;
    }
    dispatch(changePlayModeAction(newMode));
    dispatch(changePlayListAction(list));
    resetCurrentIndex(list);
    toastRef.current.show();
  }, [dispatch, mode, sequenceList, resetCurrentIndex]);
  const toggleLoop = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {});
  };
  const handleEnd = () => {
    if (mode === playMode.loop) {
      toggleLoop();
    } else {
      toggleNextSong();
    }
  };
  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };
  const getLyric = useCallback(async (id) => {
    try {
      // res.lrc.lyric
      const res = await getLyricRequest(id);
      const lyric = res.lrc.lyric;
      if (!lyric) {
        currentLyric.current = null;
        return;
      }
      if (currentLyric.current) {
        currentLyric.current.stop();
        currentLyric.current = null;
      }
      currentLyric.current = new Lyric(lyric, handleLyric);
      currentLyric.current.play();
      currentLineNum.current = 0;
      currentLyric.current.seek(0);
    } catch (error) {
      setSongReady(true);
      audioRef.current.play().catch((err) => {});
    }
  }, []);
  useEffect(() => {
    if (currentSong && audioRef.current) {
      setDuration(currentSong.dt / 1000);
      setPreSong(currentSong);
      setTimeout(() => {
        getLyric(currentSong.id);
        audioRef.current.play().catch((err) => {});
      }, 0);
    }
  }, [currentSong, getLyric]);
  useEffect(() => {
    if (audioRef.current) {
      setTimeout(() => {
        if (playing) {
          audioRef.current.play().catch((err) => {});
          currentLyric.current &&
            currentLyric.current.togglePlay(currentTime * 1000);
        } else {
          audioRef.current.pause();
          currentLyric.current && currentLyric.current.stop();
        }
      }, 0);
    }
  }, [playing, currentTime]);
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
            changeShowPlayListDispatch={changeShowPlayListDispatch}
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
            currentLyric={currentLyric.current}
            currentPlayingLyric={currentPlayingLyric}
            currentLineNum={currentLineNum.current}
            handleChangeMode={handleChangeMode}
            changeFullScreenDispatch={changeFullScreenDispatch}
            changePlayingStateDispatch={changePlayingStateDispatch}
            changeShowPlayListDispatch={changeShowPlayListDispatch}
            toggleNextSong={toggleNextSong}
            togglePrevSong={togglePrevSong}
            triggerTouchPercentChange={triggerTouchPercentChange}
          />
        </div>
      ) : null}
      <PlayList
        songReady={songReady}
        setSongReady={setSongReady}
        preSong={preSong}
      ></PlayList>
      {currentSongPlayUrl && (
        <audio
          ref={audioRef}
          src={currentSongPlayUrl}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnd}
        />
      )}
      <Toast text={modeText} ref={toastRef} />
    </div>
  );
});
