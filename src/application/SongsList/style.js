import styled from 'styled-components';
import style from '@/assets/global-style';
export const SongList = styled.div`
  -webkit-transform: rotate(0deg);
  border-radius: 10px;
  background: ${style['color-highlight-background']};
  .first_line {
    box-sizing: border-box;
    border-bottom: 1px solid grey;
    padding: 10px 0;
    position: relative;
    justify-content: space-between;
    margin-left: 10px;
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${style['color-text-ll']};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${style['font-size-small']};
        color: ${style['color-text-l']};
      }
      > span {
        vertical-align: top;
      }
    }
    .add_list {
      position: absolute;
      display: flex;
      align-items: center;
      right: 0;
      top: 0;
      bottom: 0;
      width: 130px;
      line-height: 34px;
      background: ${style['color-theme-d']};
      color: ${style['color-text']};
      font-size: 0;
      border-radius: 4px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
  }
`;
export const SongItem = styled.ul`
  > li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      flex: 0 0 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid gray;
      ${style.noWrap()}
      > span {
        ${style.noWrap()}
      }
      > span:first-child {
        color: ${style['color-text-ll']};
      }
      > span:last-child {
        font-size: ${style['font-size-small']};
        color: #bba8a8;
      }
    }
  }
`;
