import React, { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
export default memo(function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);

  const { id } = props.match.params;

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
