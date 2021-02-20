import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { getRankListAction } from './store';

export default memo(function Rank() {
  const { rankList, loading } = useSelector((state) => ({
    rankList: state.rank.rankList,
    loading: state.rank.loading,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankListAction());
    }
  }, [dispatch, rankList]);
  console.log(rankList, loading);
  return <div>Rank</div>;
});
