import styled from 'styled-components';
import style from '@/assets/global-style';
export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.playList > 0 ? '55px' : '0px')};
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
export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${(props) => (props.globalRank ? 'flex' : '')};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  &::after {
    content: '';
    display: block;
    width: 32vw;
  }
`;
export const ListItem = styled.li`
  display: ${(props) => (props.tracks.length ? 'flex' : '')};
  .img_wrapper {
    width: ${(props) => (props.tracks.length ? '27vw' : '32vw')};
    height: ${(props) => (props.tracks.length ? '27vw' : '32vw')};
    padding: 3px 0;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, 0.4));
      -webkit-transform: rotate(0deg);
      border-radius: 4px;
    }
    img {
      width: 100%;
      height: 100%;
      -webkit-transform: rotate(0deg);
      border-radius: 4px;
    }
    .update_frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style['font-size-small-s']};
      color: ${style['color-text-ll']};
    }
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${style['font-size-medium']};
    color: ${style['color-text-ll']};
  }
`;
