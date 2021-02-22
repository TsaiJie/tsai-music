import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.playList > 0 ? '55px' : '0px')};
  width: 100%;
`;
