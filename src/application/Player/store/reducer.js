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
  if (playList.length === 0) {
    currentIndex = -1;
  }
  console.log( {
    playList: playList,
    sequencePlayList: sequenceList,
    currentIndex: currentIndex,
  });
  return {
    playList: playList,
    sequencePlayList: sequenceList,
    currentIndex: currentIndex,
  };
};

const handleInsertSong = (state, song) => {
  const playList = JSON.parse(JSON.stringify(state.playList));
  const sequenceList = JSON.parse(JSON.stringify(state.sequenceList));
  let currentIndex = state.currentIndex;
  // 看看有没有同款
  let fpIndex = findIndex(song, playList);
  console.log(1, 'playList', playList);
  console.log(1, 'sequenceList', sequenceList);
  console.log(1, 'currentIndex', currentIndex);
  // 如果是当前歌曲直接不处理
  if (fpIndex === currentIndex && currentIndex !== -1)
    return {
      playList,
      sequenceList,
      currentIndex,
    };

  currentIndex++;
  // 把歌放进去，放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它 oldSong
  if (fpIndex > -1) {
    // 如果 oldSong 的索引在目前播放歌曲的索引小，那么删除它，同时当前 index 要减一
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      // 否则直接删掉 oldSong
      playList.splice(fpIndex + 1, 1);
    }
  }
  // 同理，处理 sequenceList
  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex(song, sequenceList);
  // 插入歌曲
  sequenceList.splice(sequenceIndex, 0, song);
  if (fsIndex > -1) {
    // 跟上面类似的逻辑。如果在前面就删掉，index--; 如果在后面就直接删除
    if (sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  console.log(2, 'playList', playList);
  console.log(2, 'sequenceList', sequenceList);
  console.log(2, 'currentIndex', currentIndex);
  return {
    playList,
    sequenceList,
    currentIndex,
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
    case actionTypes.INSERT_SONG:
      const {
        playList: pList,
        sequenceList: seqList,
        currentIndex: curIndex,
      } = handleInsertSong(draft, action.song);
      draft.playList = pList;
      draft.sequenceList = seqList;
      draft.currentIndex = curIndex;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
