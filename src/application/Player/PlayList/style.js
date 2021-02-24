import styled from 'styled-components';
import style from '@/assets/global-style';

export const PlayListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style['color-background-d']};
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background: ${style['color-background']};
    transform: translate3d(0, 0, 0);
    .list_close {
      text-align: center;
      background: red;
    }
  }
`;
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;
export const ListHeader = styled.div``;
export const ListContent = styled.ul``;
