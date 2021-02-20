import React, { memo } from 'react';
import { Container } from './style';
export default memo(function Singer(props) {
  const { id } = props.match.params;

  return <Container>Singer {id}</Container>;
});
