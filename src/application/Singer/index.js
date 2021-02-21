import React, { memo, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getSingerInfoAction } from './store';
import { Container } from './style';
export default memo(function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const { id } = props.match.params;
  const { artist, songsOfArtist, loading } = useSelector((state) => ({
    artist: state.singerInfo.artist,
    songsOfArtist: state.singerInfo.songsOfArtist,
    loading: state.singerInfo.loading,
  }), shallowEqual);
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
      <Container>Singer {id}</Container>
    </CSSTransition>
  );
});
