import styled from 'styled-components';
import style from '@/assets/global-style';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  color: ${style['color-theme']};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`;
export const TabContainer = styled.div`
  height: 44px;
  display: flex;
  line-height: 44px;
  font-size: ${style['font-size-medium-x']};
  .tab-item {
    flex: 1;
    text-align: center;
    &.active {
      span {
        color: ${style['color-theme']};
        border-bottom: 2px solid ${style['color-theme']};
      }
    }
  }
`;
