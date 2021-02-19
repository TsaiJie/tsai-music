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
// 改变页码
export const changePageCountAction = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  pageCount: data,
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
// 加载热门歌手
export const getHotSingerListAction = (mode) => {
  return async (dispatch, getState) => {
    try {
      const pageCount = getState().singers.pageCount;
      const singerList = getState().singers.singerList;
      const res = await getHotSingerListRequest(pageCount);
      const newArtists = res.artists;
      let totalArtists;
      if (mode ==='pullDown') {
        totalArtists = newArtists
      }else {
        totalArtists = [...singerList, ...newArtists];
      }
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
      dispatch(changeEnterLoadingAction(false));
      dispatch(changePullDownLoadingAction(false));
      dispatch(changePullUpLoadingAction(false));
    } catch (error) {
      console.log('类别歌手数据获取失败', error);
    }
  };
};
export const getMoreCateorySingerListAction = () => {
  return async (dispatch, getState) => {
    try {
      const pageCount = getState().singers.pageCount;
      const singerList = getState().singers.singerList;
      const category = getState().singers.category;
      const alpha = getState().singers.alpha;
      const res = await getCategorySingerListRequest(
        category,
        alpha,
        pageCount
      );
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerListAction(data));
      dispatch(changePullUpLoadingAction(false));
    } catch (error) {
      console.log('获取更多类别歌手数据获取失败');
    }
  };
};
