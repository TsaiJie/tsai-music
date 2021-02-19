import styled from 'styled-components';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: white;
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    /* 解决 ios使用border-radius时失效 */
    -webkit-transform: rotate(0deg);
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: white;
    }
  }
`;
