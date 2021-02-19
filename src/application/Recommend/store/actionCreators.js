// 放不同 action 的地方
import * as actionTypes from './constants';
import { getBannerRequest, getRecommendListRequest } from '@/api/recommend';

export const changeBannerListAction = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  bannerList: data,
});
export const changeRecommendListAction = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  recommendList: data,
});
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  enterLoading: data,
});
export const getBannerListAction = () => {
  return async (dispatch) => {
    try {
      const data = await getBannerRequest();
      const banners = data.banners.map((item) => {
        const banner = {};
        banner.imageUrl = item.imageUrl;
        banner.encodeId = item.encodeId;
        banner.targetId = item.targetId;
        return banner;
      });
      dispatch(changeBannerListAction(banners));
    } catch (error) {
      console.log('轮播图数据传输数据错误', error);
    }
  };
};
export const getRecommendListAction = () => {
  return async (dispatch) => {
    try {
      const data = await getRecommendListRequest();
      dispatch(changeRecommendListAction(data.result));
      dispatch(changeEnterLoading(false));
    } catch (error) {
      console.log('推荐歌单数据传输错误', error);
    }
  };
};
