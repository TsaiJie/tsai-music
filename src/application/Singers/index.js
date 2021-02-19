import React, { memo, useCallback, useState } from 'react';
import { categoryTypes, alphaTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
import { NavContainer, ListItem, List, ListContainer } from './style';
import Scroll from '@/baseUI/Scroll';
export default memo(function Singers() {
  const [category, setCategory] = useState({});
  const [alpha, setAlpha] = useState({});
  const handleUpdateAlpha = useCallback((val) => {
    console.log(val);
    setAlpha(val);
  }, []);

  const handleUpdateCatetory = useCallback((val) => {
    console.log(val);
    setCategory(val);
  }, []);
  //mock 数据
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
    return {
      picUrl:
        'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
      name: '隔壁老樊',
      accountId: 277313426,
    };
  });
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem>
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
          value={category.key}
        />
        <HorizonScroll
          list={alphaTypes}
          title={'首字母:'}
          handleClick={handleUpdateAlpha}
          value={alpha.key}
        />
      </NavContainer>
      <ListContainer>
        <Scroll data={singerList}>{renderSingerList()}</Scroll>
      </ListContainer>
    </div>
  );
});
