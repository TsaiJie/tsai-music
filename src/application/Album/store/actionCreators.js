import { getAlbumDetailRequest } from '@/api/album';
import * as actionTypes from './constants';
const changeCurrentAlbumAction = (data) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  currentAlbum: data,
});
export const changeEnterLoadingAction = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  enterLoading: data,
});

export const getAlbumListAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await getAlbumDetailRequest(id);
      const data = res.playlist;
      dispatch(changeCurrentAlbumAction(data));
      dispatch(changeEnterLoadingAction(false));
    } catch (error) {
      console.log('获取 album 数据失败！', error);
    }
  };
};
