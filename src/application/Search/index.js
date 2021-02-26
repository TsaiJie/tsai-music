import SearchBox from '@/baseUI/SearchBox';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

export default memo(function Search(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
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
          <SearchBox back={searchBack}></SearchBox>
        </div>
      </Container>
    </CSSTransition>
  );
});
