import * as actionTypes from './constants';
import produce from 'immer';

const defaultState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      draft.artist = action.artist;
      break;
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      draft.songsOfArtist = action.songsOfArtist;
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.loading = action.loading;
      break;
    default:
      break;
  }
}, defaultState);

export default reducer;
