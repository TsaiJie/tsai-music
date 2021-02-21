import produce from 'immer';
import * as actionTypes from './constants';
import { playMode } from '@/api/config';
const defaultState = {
  playing: false, // 是否正在播放
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
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
    default:
      break;
  }
}, defaultState);

export default reducer;
