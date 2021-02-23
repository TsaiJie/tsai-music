import React, { memo } from 'react';
import LazyLoad from 'react-lazyload';
import { getCount } from '@/api/utils';
import {
  RecommendListContainer,
  RecommendListItem,
  RecommendListWrapper,
} from './style';
export default memo(function RecommendList(props) {
  const { recommendList, history } = props;
  const enterDetail = (item) => {
    history.push(`/recommend/${item.id}`);
  };
  return (
    <RecommendListWrapper>
      <h1 className="title">推荐歌单</h1>
      <RecommendListContainer>
        {recommendList.map((item, index) => {
          return (
            <RecommendListItem key={item.id} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png').default}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>

                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </RecommendListItem>
          );
        })}
      </RecommendListContainer>
    </RecommendListWrapper>
  );
});
