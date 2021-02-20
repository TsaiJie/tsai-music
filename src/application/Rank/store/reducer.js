import * as actionTypes from './constants';
import produce from 'immer';
const defaultState = {
  rankList: [],
  loading: true,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      draft.rankList = action.rankList;
      break;
    case actionTypes.CHANGE_LOADING:
      draft.loading = action.loading;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
