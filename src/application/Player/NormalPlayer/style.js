import styled, { keyframes } from 'styled-components';
import style from '@/assets/global-style';

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;
export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${style['color-background']};
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: ${style['color-background']};
      opacity: 0.6;
      filter: none;
    }
  }
`;
export const Top = styled.div``;
export const Middle = styled.div``;
export const CDWrapper = styled.div``;
export const Bottom = styled.div``;
export const ProgressWrapper = styled.div``;
export const Operators = styled.div``;
