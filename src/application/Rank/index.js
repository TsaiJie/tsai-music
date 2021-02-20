import { filterIndex } from '@/api/utils';
import Scroll from '@/baseUI/Scroll';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRankListAction, changeLoadingAction } from './store';
import { List, ListItem, Container, SongList } from './style';
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
  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);
  const enterDetail = (item) => {
    console.log(item);
  };
  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: 'none' } : { display: '' };

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List>
        {list.map((item) => {
          console.log(item.updateFrequency);
          return (
            <ListItem
              key={item.id}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="排行" />
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList)}
        </div>
      </Scroll>
    </Container>
  );
});
