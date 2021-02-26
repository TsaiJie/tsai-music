import * as actionTypes from './constants';
import { getSongDetailRequest } from '@/api/play';
export const changeFullScreenAction = (fullScreen) => ({
  type: actionTypes.SET_FULL_SCREEN,
  fullScreen,
});
export const changePlayingStateAction = (playing) => ({
  type: actionTypes.SET_PLAYING_STATE,
  playing,
});
export const changePlayListAction = (playList) => ({
  type: actionTypes.SET_PLAY_LIST,
  playList,
});
export const changeSequenceListAction = (sequenceList) => ({
  type: actionTypes.SET_SEQUENCE_LIST,
  sequenceList,
});
export const changePlayModeAction = (mode) => ({
  type: actionTypes.SET_PLAY_MODE,
  mode,
});
export const changeCurrentIndexAction = (currentIndex) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  currentIndex,
});
export const changeShowPlayListAction = (data) => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  showPlayList: data,
});
export const deleteSongAction = (data) => ({
  type: actionTypes.DELETE_SONG,
  data,
});
export const insertSongAction = (data) => ({
  type: actionTypes.INSERT_SONG,
  song: data,
});
export const getSongDetailAction = (id) => {
  return async (dispatch) => {
    const data = await getSongDetailRequest(id);
    const song = data.songs[0];
    dispatch(insertSongAction(song));
  };
};
