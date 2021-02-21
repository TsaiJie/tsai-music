import Header from '@/baseUI/Header';
import Loading from '@/baseUI/Loading';
import Scroll from '@/baseUI/Scroll';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import SongsList from '../SongsList';
import { getSingerInfoAction , changeEnterLoadingAction} from './store';
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
  // header的高度
  const HEADER_HEIGHT = 45;
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
    dispatch(changeEnterLoadingAction(true))
    dispatch(getSingerInfoAction(id));
  }, [dispatch, id]);
  // 获取图片的高度
  useEffect(() => {
    let imageWrapperHeight = imageWrapperRef.current.offsetHeight;
    songScrollWrapperRef.current.style.top = `${imageWrapperHeight - OFFSET}px`;
    initialHeight.current = imageWrapperHeight;
    //把遮罩先放在下面，以裹住歌曲列表
    layerRef.current.style.top = `${imageWrapperHeight - OFFSET}px`;
    songScrollRef.current.refresh();
  }, []);
  // 上滑下滑时的交互逻辑
  const handleScroll = useCallback((pos) => {
    const imageWrapperHeight = initialHeight.current;
    const slideY = pos.y;
    const imageDOM = imageWrapperRef.current;
    const buttonDOM = collectButtonRef.current;
    const headerDOM = headerRef.current;
    const layerDOM = layerRef.current;
    const minScrollY = -(imageWrapperHeight - OFFSET - HEADER_HEIGHT);
    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(slideY / imageWrapperHeight);

    if (slideY > 0) {
      // 处理往下拉的情况，效果：图片放大，按钮跟着偏移
      imageDOM.style.transform = `scale(${1 + percent})`;
      buttonDOM.style.transform = `translate3d(0, ${slideY}px, 0)`;
      // layer跟着移动
      layerDOM.style.top = `${imageWrapperHeight - OFFSET + slideY}px`;
    } else if (slideY >= minScrollY) {
      // 处理往上拉的情况，但是遮罩层还没超过Header部分
      layerDOM.style.top = `${
        imageWrapperHeight - OFFSET - Math.abs(slideY)
      }px`;
      // 保证遮罩层的层叠优先级比图片高，不至于被图片遮住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动慢慢透明
      buttonDOM.style.transform = `translate3d(0,${slideY}px,0)`;
      buttonDOM.style.opacity = `${1 - percent * 1.3}`;
    } else if (slideY < minScrollY) {
      // 往上滑动但是遮罩层超过Header
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
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
        <Header
          ref={headerRef}
          handleClick={setShowStatusFalse}
          title={artist.name}
        />
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapperRef}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButtonRef}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layerRef}></BgLayer>
        <SongListWrapper ref={songScrollWrapperRef} className="SongListWrapper">
          <Scroll ref={songScrollRef} onScroll={handleScroll}>
            <SongsList songList={songsOfArtist} showCollect={false} />
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading /> : null}
      </Container>
    </CSSTransition>
  );
});
