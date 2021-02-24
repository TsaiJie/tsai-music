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
export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title {
    display: flex;
    align-items: center;
    > div {
      flex: 1;
      .text {
        flex: 1;
        font-size: ${style['font-size-medium']};
        color: ${style['color-text-ll']};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${style['font-size-large']};
      color: ${style['color-theme']};
    }
    .clear {
      ${style.extendClick()}
      font-size: ${style['font-size-large']}
    }
  }
`;
export const ListContent = styled.ul``;
