import * as actionTypes from './constants';
import produce from 'immer';
const defaultState = {
  hotList: [], // 热门关键词列表
  suggestList: {}, // 列表，包括歌单和歌手
  songsList: [], // 歌曲列表
  enterLoading: false,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.SET_HOT_KEYWORDS:
      draft.hotList = action.hotList;
      break;
    case actionTypes.SET_SUGGEST_LIST:
      draft.suggestList = action.suggestList;
      break;
    case actionTypes.SET_RESULT_SONGS_LIST:
      draft.songsList = action.songsList;
      break;
    case actionTypes.SET_ENTER_LOADING:
      draft.enterLoading = action.enterLoading;
      break;
    default:
      break;
  }
}, defaultState);
export default reducer;
