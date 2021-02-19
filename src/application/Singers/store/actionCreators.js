import { getHotSingerListRequest, getSingerListRequest } from '@/api/singers';
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
// 第一次加载热门歌手
export const getHotSingerListAction = () => {
  return (dispatch) => {
    getHotSingerListRequest(0)
      .then((res) => {
        const data = res.artists;
        dispatch(changeSingerListAction(data));
        // 进场动画设置为false
        dispatch(changeEnterLoadingAction(false));
        // 下拉动画设置为false
        dispatch(changePullDownLoadingAction(false));
        dispatch(changePullUpLoadingAction(false));
      })
      .catch(() => {
        console.log('热门歌手数据获取失败');
      });
  };
};
// 加载更多热门歌手
export const refreshGetMoreHotSingerListAction = () => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;
    getHotSingerListRequest(pageCount)
      .then((res) => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerListAction(data));
        dispatch(changePullDownLoadingAction(false));
        dispatch(changePullUpLoadingAction(false));
      })
      .catch(() => {
        console.log('刷新热门歌手数据获取失败');
      });
  };
};
// 第一次加载对应类别的歌手
export const getCateorySingerListAction = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0)
      .then((res) => {
        const data = res.artists;
        dispatch(changeSingerListAction(data));
        dispatch(changeEnterLoadingAction(false));
        dispatch(changePullDownLoadingAction(false));
        dispatch(changePullUpLoadingAction(false));
      })
      .catch(() => {
        console.log('类别歌手数据获取失败');
      });
  };
};
// 加载更多歌手
export const refreshGetMoreCategorySingerListAction = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount;
    const singerList = getState().singers.singerList;
    getSingerListRequest(category, alpha, pageCount)
      .then((res) => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerListAction(data));
        dispatch(changePullUpLoadingAction(false));
      })
      .catch(() => {
        console.log('获取更多类别歌手数据获取失败');
      });
  };
};
