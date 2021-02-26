import styled from 'styled-components';
import style from '@/assets/global-style';
export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  margin-top: 10px;
  .icon-back {
    font-size: 24px;
    color: ${style['color-text-ll']};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 40px;
    background: #333333;
    color: ${style['color-text-ll']};
    font-size: ${style['font-size-medium']};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style['color-text-l']};
    &::placeholder {
      color: ${style['color-text-l']};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${style['color-text-ll']};
  }
`;
