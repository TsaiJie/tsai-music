import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';
const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`;

const LoadingWrapper = styled.div`
  > div {
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    height: 60px;
    background: ${style['color-dialog-background']};
    margin: auto;
    opacity: 0.6;
    -webkit-transform: rotate(0deg);
    border-radius: 50%;
    animation: ${loading} 1.4s infinite ease-in;
  }
  > div:nth-child(2) {
    animation-delay: -0.7s;
  }
`;
export default memo(function Loading() {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
});
