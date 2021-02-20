import * as actionTypes from './constants';
import { getRankListRequest } from '@/api/rank';

const changeRankListAction = (data) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  rankList: data,
});
export const changeLoadingAction = (data) => ({
  type: actionTypes.CHANGE_LOADING,
  loading: data,
});
export const getRankListAction = () => {
  return async (dispatch) => {
    try {
      const data = await getRankListRequest();
      const list = data && data.list;
      const resList = list.map((item, index) => {
        const id = item.id;
        const name = item.name;
        const playCount = item.playCount;
        const userId = item.userId;
        const coverImgId = item.coverImgId;
        const coverImgUrl = item.coverImgUrl;
        const tracks = item.tracks;
        const updateFrequency = item.updateFrequency;
        return {
          id,
          name,
          updateFrequency,
          playCount,
          userId,
          coverImgId,
          coverImgUrl,
          tracks,
        };
      });
      dispatch(changeRankListAction(resList));
      dispatch(changeLoadingAction(false));
    } catch (error) {
      console.log(error);
    }
  };
};
