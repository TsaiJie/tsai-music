import React, { memo, useEffect } from 'react';
// 引入 forceCheck 方法
import { forceCheck } from 'react-lazyload';
import Slider from '@/components/Slider';
import RecommendList from '@/components/RecommendList';
import Scroll from '@/baseUI/Scroll';
import { Content } from './style';
import {
  changeEnterLoading,
  getBannerListAction,
  getRecommendListAction,
} from './store/actionCreators';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loading from '@/baseUI/Loading';
export default memo(function Recommend() {
  //mock 数据
  const dispatch = useDispatch();
  const { bannerList, recommendList, enterLoading } = useSelector(
    (state) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
      enterLoading: state.recommend.enterLoading,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(changeEnterLoading(true));
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
      {enterLoading ? <Loading /> : null}
    </Content>
  );
});
