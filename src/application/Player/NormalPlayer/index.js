import React, { memo } from 'react';
import { getName } from '@/api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from './style';
export default memo(function NormalPlayer(props) {
  const { song } = props;
  console.log(song);
  return (
    <NormalPlayerContainer>
      <div className="background">
        <img
          src={song.al.picUrl + '?param=300x300'}
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      <div className="background layer"></div>
    </NormalPlayerContainer>
  );
});
