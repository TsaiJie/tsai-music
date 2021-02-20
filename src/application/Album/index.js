import React, { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
export default memo(function Album() {
  const [showStatus, setShowStatus] = useState(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
    >
      <Container>Album</Container>
    </CSSTransition>
  );
});
