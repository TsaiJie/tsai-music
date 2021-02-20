import React, { memo, useCallback } from 'react';
import { categoryTypes, alphaTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
import { NavContainer, ListItem, List, ListWrapper } from './style';
import Scroll from '@/baseUI/Scroll';
import { actionCreators } from './store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react/cjs/react.development';
import Loading from '@/baseUI/Loading';
import LazyLoad, { forceCheck } from 'react-lazyload';
import {
  getCateorySingerListAction,
  getMoreCateorySingerListAction,
} from './store/actionCreators';
const {
  getHotSingerListAction,
  changePageCountAction,
  changeEnterLoadingAction,
  changePullUpLoadingAction,
  changePullDownLoadingAction,
  changeAlphaAction,
  changeCategoryAction,
} = actionCreators;
export default memo(function Singers() {
  const scrollRef = useRef(null);
  // redux
  const dispatch = useDispatch();
  const {
    singerList,
    enterLoading,
    alpha,
    category,
    pullDownLoading,
    pageCount,
    pullUpLoading,
  } = useSelector(
    (state) => ({
      category: state.singers.category,
      alpha: state.singers.alpha,
      singerList: state.singers.singerList,
      enterLoading: state.singers.enterLoading,
      pullUpLoading: state.singers.pullUpLoading,
      pullDownLoading: state.singers.pullDownLoading,
      pageCount: state.singers.pageCount,
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
    dispatch(changePageCountAction(0)); //由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoadingAction(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getCateorySingerListAction());
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
      dispatch(changePageCountAction(pageCount + 1));
      dispatch(getHotSingerListAction());
    } else {
      dispatch(getMoreCateorySingerListAction());
    }
  }, [dispatch, pageCount, category, alpha]);
  const pullDownRefreshData = useCallback(() => {
    console.log('pullDownRefreshData');
    dispatch(changePullDownLoadingAction(true));
    dispatch(changePageCountAction(0)); //属于重新获取数据
    if (category === null && alpha === null) {
      dispatch(getHotSingerListAction('pullDown'));
    } else {
      dispatch(getCateorySingerListAction());
    }
  }, [category, alpha, dispatch]);
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.id}>
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
              <span className="name">{item.index} {item.name} {item.id}</span>
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
      <ListWrapper>
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
    </div>
  );
});
