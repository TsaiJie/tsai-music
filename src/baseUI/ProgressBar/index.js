import React, { memo } from 'react';
import styled from 'styled-components';
import style from '@/assets/global-style';
import { prefixStyle } from '@/api/utils';
const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    -webkit-transform: rotate(0deg);
    border-radius: 2px;
    background: ${style['color-theme-d']};
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['color-theme']};
    }
  }
  .progress-btn-wrapper {
    position: absolute;
    left: -8px;
    top: -13px;
    width: 30px;
    height: 30px;
    .progress-btn {
      box-sizing: border-box;
      position: relative;
      top: 7px;
      left: 7px;
      width: 16px;
      height: 16px;
      border: 3px solid ${style['border-color']};
      -webkit-transform: rotate(0deg);
      border-radius: 50%;
      background: ${style['color-theme']};
    }
  }
`;
export default memo(function ProgressBar() {
  return (
    <ProgressBarWrapper>
      <div className="bar-inner">
        <div className="progress"></div>
        <div className="progress-btn-wrapper">
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
});
