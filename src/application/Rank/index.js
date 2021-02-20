import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRankListAction, changeLoadingAction } from './store';

export default memo(function Rank() {
  const { rankList, loading } = useSelector((state) => ({
    rankList: state.rank.rankList,
    loading: state.rank.loading,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!rankList.length) {
      dispatch(changeLoadingAction(false));
      dispatch(getRankListAction());
    }
  }, [dispatch, rankList]);
  console.log(rankList);
  return <div>Rank</div>;
});
