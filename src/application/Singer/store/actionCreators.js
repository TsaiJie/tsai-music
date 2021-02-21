import * as actionTypes from './constants';
import { getSingerInfoRequest } from '@/api/singer';

const changeArtistAction = (data) => ({
  type: actionTypes.CHANGE_ARTIST,
  artist: data,
});
const changeSongsAction = (data) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  songsOfArtist: data,
});

export const changeEnterLoadingAction = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  loading: data,
});
export const getSingerInfoAction = (id) => {
  return async (dispatch) => {
    const res = await getSingerInfoRequest(id);
    dispatch(changeArtistAction(res.artist));
    dispatch(changeSongsAction(res.hotSongs));
    dispatch(changeEnterLoadingAction(false));
  };
};
