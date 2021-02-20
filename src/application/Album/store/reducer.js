import * as actionTypes from './constants';
import produce from 'immer';

const defaultState = {
  currentAlbum: {},
  enterLoading: false,
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      draft.currentAlbum = action.currentAlbum;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.enterLoading;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
