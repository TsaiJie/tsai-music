import styled, { keyframes } from 'styled-components';
import style from '@/assets/global-style';

const confirmFadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const confirmZoom = keyframes`
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.1);
  }
  100%{
    transform: scale(1);
  }
`;
export const ConfirmWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style['color-background-d']};
  &.confirm-fade-enter-active {
    animation: ${confirmFadeIn} 0.3s;
    .confirm_content {
      animation: ${confirmZoom} 0.3s;
    }
  }
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 100;
    .confirm_content {
      width: 270px;
      -webkit-transform: rotate(0deg);
      border-radius: 13px;
      background: ${style['color-dialog-background']};
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: ${style['font-size-large']};
        color: ${style['color-text-ll']};
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: ${style['font-size-large']};
        .operate_btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid ${style['border-color']};
          color: ${style['color-text-ll']};
          &.left {
            border-right: 1px solid ${style['border-color']};
          }
        }
      }
    }
  }
`;
