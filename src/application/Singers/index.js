import React, { memo, useCallback, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { categoryTypes, alphaTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
import Scroll from '@/baseUI/Scroll';
import Loading from '@/baseUI/Loading';
import { NavContainer, ListItem, List, ListWrapper } from './style';
import { actionCreators } from './store';

import {
  getCategorySingerListAction,
  getMoreCategorySingerListAction,
} from './store/actionCreators';
import { renderRoutes } from 'react-router-config';
const {
  getHotSingerListAction,
  getMoreHotSingerListAction,
  changeEnterLoadingAction,
  changePullUpLoadingAction,
  changePullDownLoadingAction,
  changeAlphaAction,
  changeCategoryAction,
} = actionCreators;
export default memo(function Singers(props) {
  const scrollRef = useRef(null);
  // redux
  const dispatch = useDispatch();
  const {
    singerList,
    enterLoading,
    alpha,
    category,
    pullDownLoading,
    pullUpLoading,
    playList,
  } = useSelector(
    (state) => ({
      category: state.singers.category,
      alpha: state.singers.alpha,
      singerList: state.singers.singerList,
      enterLoading: state.singers.enterLoading,
      pullUpLoading: state.singers.pullUpLoading,
      pullDownLoading: state.singers.pullDownLoading,
      playList: state.player.playList,
    }),
    shallowEqual
  );

  // 组件第一次渲染时 获取热门歌手数据
  useEffect(() => {
    if (singerList.length === 0) {
      dispatch(getHotSingerListAction());
    }
  }, [dispatch, singerList]);
  //  函数
  const categoryOrAlphaChange = useCallback(() => {
    dispatch(changeEnterLoadingAction(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getCategorySingerListAction());
    scrollRef.current.refresh();
  }, [dispatch]);
  const changeAlphaActionDispatch = useCallback(
    (val) => {
      dispatch(changeAlphaAction(val));
      categoryOrAlphaChange(category, val);
    },
    [dispatch, category, categoryOrAlphaChange]
  );
  const changeCategoryActionDispatch = useCallback(
    (val) => {
      dispatch(changeCategoryAction(val));
      categoryOrAlphaChange(val, alpha);
    },
    [dispatch, alpha, categoryOrAlphaChange]
  );
  const pullUpGetMoreData = useCallback(() => {
    console.log('pullUpGetMoreData');
    dispatch(changePullUpLoadingAction(true));
    if (category === null && alpha === null) {
      dispatch(getMoreHotSingerListAction());
    } else {
      dispatch(getMoreCategorySingerListAction());
    }
  }, [dispatch, category, alpha]);
  const pullDownRefreshData = useCallback(() => {
    console.log('pullDownRefreshData');
    dispatch(changePullDownLoadingAction(true));
    if (category === null && alpha === null) {
      dispatch(getHotSingerListAction());
    } else {
      dispatch(getCategorySingerListAction());
    }
  }, [category, alpha, dispatch]);
  const enterDetail = (item) => {
    props.history.push(`/singers/${item.id}`);
  };
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.id} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png').default}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name"> {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <div>
      <NavContainer>
        <HorizonScroll
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={changeCategoryActionDispatch}
          value={category && category.key}
        />
        <HorizonScroll
          list={alphaTypes}
          title={'首字母:'}
          handleClick={changeAlphaActionDispatch}
          value={alpha && alpha.key}
        />
      </NavContainer>
      <ListWrapper playList={playList.length}>
        <Scroll
          ref={scrollRef}
          pullDown={pullDownRefreshData}
          pullUp={pullUpGetMoreData}
          data={singerList}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
      </ListWrapper>
      {enterLoading ? <Loading></Loading> : null}
      {renderRoutes(props.route.routes)}
    </div>
  );
});
