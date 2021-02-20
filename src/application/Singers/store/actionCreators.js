import {
  getHotSingerListRequest,
  getCategorySingerListRequest,
} from '@/api/singers';
import * as actionTypes from './constants';
// 改变歌手列表
const changeSingerListAction = (data) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  singerList: data,
});
// 进场loading
export const changeEnterLoadingAction = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  enterLoading: data,
});
//滑到最底部loading
export const changePullUpLoadingAction = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  pullUpLoading: data,
});
// 滑到最底部loading
export const changePullDownLoadingAction = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  pullDownLoading: data,
});
//  改变category
export const changeCategoryAction = (data) => ({
  type: actionTypes.CHANGE_CATEGORY,
  category: data,
});
// 改变alpha
export const changeAlphaAction = (data) => ({
  type: actionTypes.CHANGE_ALPHA,
  alpha: data,
});
export const changeListOffset = (data) => ({
  type: actionTypes.CHANGE_LIST_OFFSET,
  listOffset: data,
});
// 第一次加载热门歌手
export const getHotSingerListAction = (mode) => {
  return async (dispatch, getState) => {
    try {
      const res = await getHotSingerListRequest(0);
      const newArtists = res.artists;
      dispatch(changeListOffset(newArtists.length));
      dispatch(changeSingerListAction(newArtists));
      // 进场动画设置为false
      dispatch(changeEnterLoadingAction(false));
      // 下拉动画设置为false
      dispatch(changePullDownLoadingAction(false));
    } catch (error) {
      console.log('热门歌手数据获取失败', error);
    }
  };
};
// 加载热门歌手
export const getMoreHotSingerListAction = (mode) => {
  return async (dispatch, getState) => {
    try {
      const listOffset = getState().singers.listOffset;
      const singerList = getState().singers.singerList;
      const res = await getHotSingerListRequest(listOffset);
      const newArtists = res.artists;
      const totalArtists = [...singerList, ...newArtists];
      dispatch(changeListOffset(totalArtists.length));
      dispatch(changeSingerListAction(totalArtists));
      // 进场动画设置为false
      dispatch(changeEnterLoadingAction(false));
      // 下拉动画设置为false
      dispatch(changePullDownLoadingAction(false));
      // 上拉动画设置为false
      dispatch(changePullUpLoadingAction(false));
    } catch (error) {
      console.log('热门歌手数据获取失败', error);
    }
  };
};
// 第一次加载对应类别的歌手
export const getCateorySingerListAction = () => {
  return async (dispatch, getState) => {
    try {
      const category = getState().singers.category;
      const alpha = getState().singers.alpha;
      const res = await getCategorySingerListRequest(category, alpha, 0);
      const newArtists = res.artists;
      dispatch(changeSingerListAction(newArtists));
      dispatch(changeListOffset(newArtists.length));
      dispatch(changeEnterLoadingAction(false));
      dispatch(changePullDownLoadingAction(false));
    } catch (error) {
      console.log('类别歌手数据获取失败', error);
    }
  };
};

export const getMoreCateorySingerListAction = () => {
  return async (dispatch, getState) => {
    try {
      const listOffset = getState().singers.listOffset;
      const singerList = getState().singers.singerList;
      const category = getState().singers.category;
      const alpha = getState().singers.alpha;
      const res = await getCategorySingerListRequest(
        category,
        alpha,
        listOffset
      );
      const data = [...singerList, ...res.artists];
      dispatch(changeListOffset(data.length));
      dispatch(changeSingerListAction(data));
      dispatch(changePullUpLoadingAction(false));
    } catch (error) {
      console.log('获取更多类别歌手数据获取失败');
    }
  };
};
