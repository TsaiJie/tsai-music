// 存放 initialState 和 reducer 函数
import * as actionTypes from './constants';
import produce from 'immer';
const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      draft.bannerList = action.bannerList;
      break;
    case actionTypes.CHANGE_RECOMMEND_LIST:
      draft.recommendList = action.recommendList;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.enterLoading;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
