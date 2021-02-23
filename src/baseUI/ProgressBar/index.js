import React, { memo, useEffect, useRef } from 'react';
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
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['color-theme-d']};
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
export default memo(function ProgressBar(props) {
  const { percent = 0 } = props;
  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const progressBtnRef = useRef(null);
  const progressBtnWidth = 16;
  const transform = prefixStyle('transform');
  useEffect(() => {
    if (percent >= 0) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progressRef.current.style.width = `${offsetWidth}px`;
      progressBtnRef.current.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0,0)`;
    }
  }, [percent, transform]);
  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBarRef}>
        <div className="progress" ref={progressRef}></div>
        <div className="progress-btn-wrapper" ref={progressBtnRef}>
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
});
