import React, { memo, useRef, useEffect, useState, useMemo } from 'react';
import { SearchBoxWrapper } from './style';
import { debounce } from '@/api/utils';
export default memo(function SearchBox(props) {
  const queryRef = useRef();
  const [query, setQuery] = useState('');
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: 'block' } : { display: 'none' };

  // 监听 input 框的内容
  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };
  // 缓存方法
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  // 进场时 input 框应该出现光标
  useEffect(() => {
    queryRef.current.focus();
  }, []);
  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
  }, [query, handleQueryDebounce]);
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuery]);
  const clearQuery = () => {
    setQuery('');
    queryRef.current.focus();
  };
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        ref={queryRef}
        value={query}
        onChange={handleChange}
      />
      <i className="iconfont icon-delete" style={displayStyle} onClick={clearQuery}>
        &#xe600;
      </i>
    </SearchBoxWrapper>
  );
});
