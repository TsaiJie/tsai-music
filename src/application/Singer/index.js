import Header from '@/baseUI/Header';
import Scroll from '@/baseUI/Scroll';
import React, { memo, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import SongsList from '../SongsList';
import { getSingerInfoAction } from './store';
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper,
} from './style';
export default memo(function Singer(props) {
  const collectButtonRef = useRef();
  const imageWrapperRef = useRef();
  const songScrollWrapperRef = useRef();
  const songScrollRef = useRef();
  const headerRef = useRef();
  const layerRef = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
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
  useEffect(() => {
    let imageWrapperHeight = imageWrapperRef.current.offsetHeight;
    songScrollWrapperRef.current.style.top = `${imageWrapperHeight - OFFSET}px`;
    initialHeight.current = imageWrapperHeight;
    //把遮罩先放在下面，以裹住歌曲列表
    layerRef.current.style.top = `${imageWrapperHeight - OFFSET}px`;
    songScrollRef.current.refresh();
  }, []);
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
        <Header title={'头部'} ref={headerRef} />
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapperRef}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButtonRef}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layerRef}></BgLayer>
        <SongListWrapper ref={songScrollWrapperRef}>
          <Scroll ref={songScrollRef}>
            <SongsList songList={songsOfArtist} showCollect={false} />
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
});
