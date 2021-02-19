import React, { memo, useEffect } from 'react';
// 引入 forceCheck 方法
import { forceCheck } from 'react-lazyload';
import Slider from '@/components/Slider';
import RecommendList from '@/components/RecommendList';
import Scroll from '@/baseUI/Scroll';
import { Content } from './style';
import {
  getBannerListAction,
  getRecommendListAction,
} from './store/actionCreators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
export default memo(function Recommend() {
  //mock 数据
  const dispatch = useDispatch();
  const { bannerList, recommendList } = useSelector(
    (state) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(getBannerListAction());
    dispatch(getRecommendListAction());
  }, [dispatch]);

  return (
    <Content>
      <Scroll data={recommendList} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
});
