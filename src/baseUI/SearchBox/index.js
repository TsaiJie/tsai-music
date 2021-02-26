import React, { memo } from 'react';
import { SearchBoxWrapper } from './style';
import { debounce } from '@/api/utils';
export default memo(function SearchBox(props) {
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input className="box" placeholder="搜索歌曲、歌手、专辑"></input>
      <i className="iconfont icon-delete">&#xe600;</i>
    </SearchBoxWrapper>
  );
});
