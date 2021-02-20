import styled from 'styled-components';
import style from '@/assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: ${style['color-background']};
  transform-origin: right bottom;
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
// 添加 TopDesc 和 Menu
export const TopDesc = styled.div`
  display: flex;
  width: 100%;
  height: 275px;
  position: relative;
  box-sizing: border-box;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  justify-content: space-around;
  align-items: center;
  background-size: 100%;
  .background {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    background: url(${(props) => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      height: 35px;
      width: 100%;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
      top: 0;
      border-radius: 3px;
      z-index: 1;
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style['font-size-small']};
      line-height: 15px;
      color: ${style['color-text-ll']};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 100%;
      height: 100%;
      -webkit-transform: rotate(0deg);
      border-radius: 4px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style['color-text-ll']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style['font-size-large']};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style['font-size-medium-x']};
        color: ${style['color-text-ll']};
      }
    }
  }
`;
export const Menu = styled.div``;
//style.js 中加入
export const SongList = styled.div``;
