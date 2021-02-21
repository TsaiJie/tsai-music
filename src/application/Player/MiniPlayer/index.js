import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';

export default memo(function MiniPlayer(props) {
  const { song, fullScreen } = props;
  console.log('mini', song);
  console.log('mini',!fullScreen);

  return (
    <CSSTransition classNames="mini" in={!fullScreen} timeout={400}>
      <div>MiniPlayer</div>
    </CSSTransition>
  );
});
