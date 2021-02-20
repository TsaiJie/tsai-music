import styled from 'styled-components';
import style from '@/assets/global-style';
export const SongList = styled.div`
  border-radius: 10px;
  background: ${style['color-highlight-background']};
  .first_line {
    box-sizing: border-box;
    border-bottom: 1px solid ${style['border-color']};
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
    .add_list,
    .isCollected {
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
export const SongItem = styled.ul``;
