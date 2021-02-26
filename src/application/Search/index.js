import Scroll from '@/baseUI/Scroll';
import SearchBox from '@/baseUI/SearchBox';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  getHotKeyWordsAction,
  getSuggestListAction,
  changeEnterLoadingAction,
} from './store/actionCreators';
import { Container, ShortcutWrapper, HotKeyList } from './style';
// 当搜索框为空，展示热门搜索列表
// 当搜索框有内容时，发送 Ajax 请求，显示搜索结果
// 点击搜索结果，分别进入到不同的详情页中
export default memo(function Search(props) {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const {
    enterLoading,
    hotList,
    suggestList,
    songsCount,
    songsList,
  } = useSelector(
    (state) => ({
      enterLoading: state.search.enterLoading,
      hotList: state.search.hotList,
      suggestList: state.search.suggestList,
      songsList: state.search.songsList,
      songsCount: state.player.playList.length,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleQuery = (q) => {
    setQuery(q);
  };
  const getHotKeyWordsDispatch = useCallback(() => {
    dispatch(getHotKeyWordsAction());
  }, [dispatch]);
  const getSuggestListDispatch = (data) => {
    dispatch(getSuggestListAction(data));
  };
  const changeEnterLoadingDispatch = (data) => {
    dispatch(changeEnterLoadingAction(data));
  };
  useEffect(() => {
    setShow(true);
    if (!hotList.length) return;
    getHotKeyWordsDispatch();
  }, [getHotKeyWordsDispatch, hotList]);
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
  const renderHotKeyList = () => {
    const list = hotList ? hotList : [];
    return (
      <ul>
        {list.map((item) => {
          return (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  console.log(hotList);
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      mountOnEnter
      onExited={() => props.history.goBack()}
    >
      <Container>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          />
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKeyList>
                <h1 className="title"> 热门搜索 </h1>
                {renderHotKeyList()}
              </HotKeyList>
            </div>
          </Scroll>
        </ShortcutWrapper>
      </Container>
    </CSSTransition>
  );
});
