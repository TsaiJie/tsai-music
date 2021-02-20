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
      dispatch(changeRankListAction(list));
      dispatch(changeLoadingAction(false));
    } catch (error) {
      console.log(error);
    }
  };
};
