import React, { memo, useEffect } from 'react';
// 引入 forceCheck 方法
import { forceCheck } from 'react-lazyload';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import Slider from '@/components/Slider';
import RecommendList from '@/components/RecommendList';
import Scroll from '@/baseUI/Scroll';
import Loading from '@/baseUI/Loading';
import { Content } from './style';
import {
  changeEnterLoading,
  getBannerListAction,
  getRecommendListAction,
} from './store/actionCreators';
import { renderRoutes } from 'react-router-config';
export default memo(function Recommend(props) {
  //mock 数据
  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading, playList } = useSelector(
    (state) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
      enterLoading: state.recommend.enterLoading,
      playList: state.player.playList,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!bannerList.length) {
      dispatch(changeEnterLoading(true));
      dispatch(getBannerListAction());
    }
    if (!recommendList.length) {
      dispatch(changeEnterLoading(true));
      dispatch(getRecommendListAction());
    }
  }, [dispatch, bannerList, recommendList]);

  return (
    <Content playList={playList.length}>
      <Scroll data={recommendList} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList
            history={props.history}
            recommendList={recommendList}
          ></RecommendList>
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
      {enterLoading ? <Loading /> : null}
    </Content>
  );
});
