import produce from 'immer';
import * as actionTypes from './constants';
import { findIndex } from '@/api/utils'; // 注意引入工具方法
import { playMode } from '@/api/config';
const defaultState = {
  playing: false, // 是否正在播放
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  showPlayList: false, // 是否展示播放列表
};
const handleDeleteSong = (state, song) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequenceList));
  let currentIndex = state.currentIndex;
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex(song, playList);
  // / 在播放列表中将其删除
  playList.splice(fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (fpIndex < currentIndex) currentIndex--;
  // 在 sequenceList 中直接删除歌曲即可
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);
  return {
    playList: playList,
    sequencePlayList: sequenceList,
    currentIndex: currentIndex,
  };
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYING_STATE:
      draft.playing = action.playing;
      break;
    case actionTypes.SET_FULL_SCREEN:
      draft.fullScreen = action.fullScreen;
      break;
    case actionTypes.SET_PLAY_LIST:
      draft.playList = action.playList;
      break;
    case actionTypes.SET_SEQUENCE_LIST:
      draft.sequenceList = action.sequenceList;
      break;
    case actionTypes.SET_PLAY_MODE:
      draft.mode = action.mode;
      break;
    case actionTypes.SET_CURRENT_INDEX:
      draft.currentIndex = action.currentIndex;
      break;
    case actionTypes.SET_SHOW_PLAYLIST:
      draft.showPlayList = action.showPlayList;
      break;
    case actionTypes.DELETE_SONG:
      const { playList, sequencePlayList, currentIndex } = handleDeleteSong(
        draft,
        action.data
      );
      draft.playList = playList;
      draft.sequenceList = sequencePlayList;
      draft.currentIndex = currentIndex;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
