import styled from 'styled-components';
import style from '@/assets/global-style';
export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .official,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style['font-size-medium']};
    color: ${style['color-theme']};
  }
`;
export const List = styled.ul``;
export const ListItem = styled.li`
  .img_wrapper {
    width: 27vw;
    height: 27vw;
    img {
      width: 100%;
      height: 100%;
      -webkit-transform: rotate(0deg);
      border-radius: 3px;
    }
  }
`;
export const SongList = styled.ul``;
