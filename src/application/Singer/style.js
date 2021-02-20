import styled from 'styled-components';
import style from '@/assets/global-style';

export const Container = styled.div`
  position: fixed;
  top:0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: ${style['color-background']};
`;