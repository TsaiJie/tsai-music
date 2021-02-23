import styled from 'styled-components';
import style from '@/assets/global-style';

export const RecommendListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${style['color-theme']};
  }
`;
export const RecommendListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const RecommendListItem = styled.div`
  position: relative;
  width: 32%;
  .img_wrapper {
    position: relative;
    height: 0;
    /* 撑开盒子 */
    padding-bottom: 100%;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
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
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    font-size: ${style['font-size-small']};
    line-height: 1.4;
    color: ${style['color-text']};
  }
`;
