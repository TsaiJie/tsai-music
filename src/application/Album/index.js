import Header from '@/baseUI/Header';
import React, { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
export default memo(function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const handleBack = () => {
    setShowStatus(false);
  };
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit={props.history.goBack}
    >
      <Container>
        <Header title={'返回'} handleClick={handleBack} />
      </Container>
    </CSSTransition>
  );
});
