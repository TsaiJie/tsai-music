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
    case actionTypes:
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
