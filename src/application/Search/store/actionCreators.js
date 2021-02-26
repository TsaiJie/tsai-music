import {
  SET_HOT_KEYWORDS,
  SET_SUGGEST_LIST,
  SET_RESULT_SONGS_LIST,
  SET_ENTER_LOADING,
} from './constants';
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from '@/api/search';

const changeHotKeyWordsAction = (data) => ({
  type: SET_HOT_KEYWORDS,
  hotList: data,
});

const changeSuggestListAction = (data) => ({
  type: SET_SUGGEST_LIST,
  suggestList: data,
});

const changeResultSongsAction = (data) => ({
  type: SET_RESULT_SONGS_LIST,
  songsList: data,
});

export const changeEnterLoadingAction = (data) => ({
  type: SET_ENTER_LOADING,
  enterLoading: data,
});
export const getHotKeyWordsAction = () => {
  return async (dispatch) => {
    const data = await getHotKeyWordsRequest();
    const list = data.result.hots;
    dispatch(changeHotKeyWordsAction(list));
  };
};
export const getSuggestListAction = (query) => {
  return async (dispatch) => {
    const suggestData = await getSuggestListRequest(query);
    if (!suggestData) return;
    const suggestRes = suggestData.result || {};
    dispatch(changeSuggestListAction(suggestRes));

    const songData = await getResultSongsListRequest(query);
    if (!songData) return;
    const songRes = songData.result.songs || [];
    dispatch(changeResultSongsAction(songRes));
    dispatch(changeEnterLoadingAction(false));
  };
};
