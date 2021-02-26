import SearchBox from '@/baseUI/SearchBox';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

export default memo(function Search(props) {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    setShow(true);
  }, []);
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
  const handleQuery = (q) => {
    console.log(q);
    setQuery(q);
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
          ></SearchBox>
        </div>
      </Container>
    </CSSTransition>
  );
});
