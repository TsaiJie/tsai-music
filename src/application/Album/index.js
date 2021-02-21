import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { isEmptyObject } from '@/api/utils';
import SongsList from '../SongsList';
import { Container, TopDesc, Menu } from './style';
import style from '@/assets/global-style';
import { getAlbumListAction, changeEnterLoadingAction } from './store';
import Header from '@/baseUI/Header';
import Scroll from '@/baseUI/Scroll';
import Loading from '@/baseUI/Loading';
export default memo(function Album(props) {
  const HEADER_HEIGHT = 45;
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headerRef = useRef();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const { currentAlbum, enterLoading } = useSelector(
    (state) => ({
      currentAlbum: state.album.currentAlbum,
      enterLoading: state.album.enterLoading,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(changeEnterLoadingAction(true));
    dispatch(getAlbumListAction(id));
  }, [dispatch, id]);
  const handleBack = () => {
    setShowStatus(false);
  };
  const handleScroll = useCallback(
    (pos) => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom = headerRef.current;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['color-theme-d'];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = '';
        headerDom.style.opacity = 1;
        setTitle('歌单');
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );
  const renderTopInfo = (currentAlbum) => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="album" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="avatar" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };
  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };
  console.log('currentAlbum', currentAlbum);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header
          ref={headerRef}
          title={title}
          isMarquee={isMarquee}
          handleClick={handleBack}
        />
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopInfo(currentAlbum)}
              {renderMenu()}
              <SongsList
                songList={currentAlbum.tracks}
                subscribedCount={currentAlbum.subscribedCount}
                showCollect={true}
              ></SongsList>
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading /> : null}
      </Container>
    </CSSTransition>
  );
});
