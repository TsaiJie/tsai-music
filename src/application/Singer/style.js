import styled from 'styled-components';
import style from '@/assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: ${style['color-background']};
  overflow: hidden;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  background: url(${(props) => props.bgUrl});
  padding-top: 75%;
  background-size: cover;
  z-index: 50;
  transform-origin: top;
  // 对图片的色调进行修饰
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;
export const CollectButton = styled.div``;
export const SongListWrapper = styled.div``;
export const BgLayer = styled.div``;
