import SearchBox from '@/baseUI/SearchBox';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  getHotKeyWordsAction,
  getSuggestListAction,
  changeEnterLoadingAction,
} from './store/actionCreators';
import { Container } from './style';

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
    getHotKeyWordsDispatch();
  }, [getHotKeyWordsDispatch]);
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
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
          ></SearchBox>
        </div>
      </Container>
    </CSSTransition>
  );
});
