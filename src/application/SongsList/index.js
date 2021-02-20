import { getCount, getName } from '@/api/utils';
import React, { memo } from 'react';
import { SongList, SongItem } from './style';
export default memo(function SongsList(props) {
  const { songList, subscribedCount } = props;
  const renderSongList = (songList) => {
    console.log(songList);
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部
              <span className="sum">(共 {songList.length} 首)</span>
            </span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏 ({getCount(subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {songList.map((item, index) => {
            return (
              <li key={item.id}>
                <div className="index">{index + 1}</div>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            );
          })}
        </SongItem>
      </SongList>
    );
  };
  return renderSongList(songList);
});
