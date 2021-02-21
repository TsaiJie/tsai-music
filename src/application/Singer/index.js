import Header from '@/baseUI/Header';
import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getSingerInfoAction } from './store';
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper,
} from './style';
export default memo(function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const { id } = props.match.params;
  const { artist, songsOfArtist, loading } = useSelector(
    (state) => ({
      artist: state.singerInfo.artist,
      songsOfArtist: state.singerInfo.songsOfArtist,
      loading: state.singerInfo.loading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingerInfoAction(id));
  }, [dispatch, id]);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={'头部'} />
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer></BgLayer>
        <SongListWrapper>// 歌曲列表部分，待会专门拆解</SongListWrapper>
      </Container>
    </CSSTransition>
  );
});
