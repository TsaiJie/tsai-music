import produce from 'immer';
import * as actionTypes from './constants';
const defaultState = {
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  listOffset: 0, // 请求列表的偏移不是page，是个数
  category: null,
  alpha: null,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      draft.singerList = action.singerList;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.enterLoading;
      break;
    case actionTypes.CHANGE_PULLUP_LOADING:
      draft.pullUpLoading = action.pullUpLoading;
      break;
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      draft.pullDownLoading = action.pullDownLoading;
      break;
    case actionTypes.CHANGE_CATEGORY:
      draft.category = action.category;
      draft.listOffset = 0;
      break;
    case actionTypes.CHANGE_ALPHA:
      draft.alpha = action.alpha;
      draft.listOffset = 0;
      break;
    case actionTypes.CHANGE_LIST_OFFSET:
      draft.listOffset = action.listOffset;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
