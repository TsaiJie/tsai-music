import React, { memo, useCallback, useState } from 'react';
import { categoryTypes, alphaTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
import { NavContainer, ListItem, List, ListWrapper } from './style';
import Scroll from '@/baseUI/Scroll';
import { actionCreators } from './store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
const {
  getHotSingerListAction,
  changePageCountAction,
  changeEnterLoadingAction,
  changePullUpLoadingAction,
  changePullDownLoadingAction,
  refreshGetMoreCategorySingerListAction,
  refreshGetMoreHotSingerListAction,
} = actionCreators;
export default memo(function Singers() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [alpha, setAlpha] = useState(null);
  const {
    singerList,
    enterLoading,
    pullDownLoading,
    pageCount,
    pullUpLoading,
  } = useSelector(
    (state) => ({
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
    dispatch(getHotSingerListAction());
  }, [dispatch]);
  const handleUpdateAlpha = useCallback((val) => {
    console.log(val);
    setAlpha(val);
  }, []);

  const handleUpdateCatetory = useCallback((val) => {
    console.log(val);
    setCategory(val);
  }, []);
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
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
          handleClick={handleUpdateCatetory}
          value={category && category.key}
        />
        <HorizonScroll
          list={alphaTypes}
          title={'首字母:'}
          handleClick={handleUpdateAlpha}
          value={alpha && alpha.key}
        />
      </NavContainer>
      <ListWrapper>
        <Scroll data={singerList}>{renderSingerList()}</Scroll>
      </ListWrapper>
    </div>
  );
});
