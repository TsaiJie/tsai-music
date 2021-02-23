import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  const { triggerTouchPercentChange } = props;
  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const progressBtnRef = useRef(null);
  const [touch, setTouch] = useState({});
  const progressBtnWidth = 14;
  const transform = prefixStyle('transform');
  const progressTouchStart = (e) => {
    const newTouch = {};
    newTouch.initiated = true;
    newTouch.startX = e.touches[0].pageX;
    // 记录点击按钮时 进度条已经偏移了多少
    newTouch.left = progressRef.current.clientWidth;
    setTouch(newTouch);
  };
  const _offset = useCallback(
    (offsetWidth) => {
      progressRef.current.style.width = `${offsetWidth}px`;
      progressBtnRef.current.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0,0)`;
    },
    [transform]
  );
  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const percent = progressRef.current.clientWidth / barWidth;
    triggerTouchPercentChange(percent); // 把新的进度传给回调函数并执行
  };
  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    // 计算移动的pageX与初始化pageX的差值 就是需要移动的距离
    const deltaX = e.touches[0].pageX - touch.startX;
    // 如果拖到很远的时候 就会超过progressBar的宽度
    const offsetWidth = Math.min(
      progressBarRef.current.clientWidth,
      Math.max(0, touch.left + deltaX)
    );
    _offset(offsetWidth);
  };
  const progressTouchEnd = () => {
    const newTouch = JSON.parse(JSON.stringify(touch));
    newTouch.initiated = false;
    _changePercent();
    setTouch(newTouch);
  };
  const progressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  useEffect(() => {
    // 没有拖动的时候才进行自动改变
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      _offset(offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);
  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progressRef}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
});
