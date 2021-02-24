import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PlayListWrapper, ScrollWrapper } from './style';
export default memo(function PlayList(props) {
  const { showPlayList } = props;
  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      mountOnEnter
    >
      <PlayListWrapper>
        <div className="list_wrapper">
          <ScrollWrapper></ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
});
