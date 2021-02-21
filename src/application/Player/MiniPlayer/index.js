import React, { memo } from 'react';

export default memo(function MiniPlayer(props) {
  const { song } = props;
  console.log(song);
  return <div>MiniPlayer</div>;
});
