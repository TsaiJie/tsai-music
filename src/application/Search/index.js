import { getName } from '@/api/utils';
import Loading from '@/baseUI/Loading';
import Scroll from '@/baseUI/Scroll';
import SearchBox from '@/baseUI/SearchBox';
import React, { memo, useEffect, useState, useCallback } from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changeFullScreenAction, changePlayingStateAction, getSongDetailAction } from '../Player/store/actionCreators';
import {
  getHotKeyWordsAction,
  getSuggestListAction,
  changeEnterLoadingAction,
} from './store/actionCreators';
import {
  Container,
  ShortcutWrapper,
  HotKeyList,
  List,
  ListItem,
  SongItem,
} from './style';
// changePlayingStateAction,
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
  const getSongDetailDispatch = useCallback(
    (id) => {
      dispatch(getSongDetailAction(id));
      dispatch(changePlayingStateAction(true))
      dispatch(changeFullScreenAction(true))
    },
    [dispatch]
  );
  const selectItem = (e, id) => {
    getSongDetailDispatch(id);
  };
  const handleQuery = useCallback((q) => {
    setQuery(q);
    if (!q) return;
    console.log('发送请求', q);
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  }, []);
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
    if (hotList.length) return;
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
  const renderSingers = () => {
    const singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌手 </h1>
        {singers.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => props.history.push(`/singers/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png').default}
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={item.picUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name"> 歌手: {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  const renderAlbum = () => {
    const albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {albums.map((item, index) => (
          <ListItem
            key={item.accountId + '' + index}
            onClick={() => props.history.push(`/album/${item.id}`)}
          >
            <div className="img_wrapper">
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
                  src={item.coverImgUrl}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
            </div>
            <span className="name"> 歌单: {item.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };
  const renderSongs = () => {
    return (
      <SongItem>
        {songsList.map((item, index) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    );
  };
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
        <ShortcutWrapper show={query}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
});
