import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { debounce } from '@/api/utils';
import PropTypes from 'prop-types';
import BScroll from '@better-scroll/core';
import styled from 'styled-components';
import Loading from '../Loading';
import LoadingV2 from '../LoadingV2';
import { useMemo } from 'react';
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    data,
  } = props;
  const { pullUp, pullDown, onScroll } = props;
  //better-scroll 实例对象
  const bScroll = useRef(null);

  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContainerRef = useRef(null);
  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);
  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);
  useEffect(() => {
    _initScroll();
    return () => {
      bScroll.current = null;
    };
    //eslint-disable-next-line
  }, []);
  // 如果bScroll实例不为空且传入onScroll 为bScroll绑定事件
  useEffect(() => {
    if (!bScroll.current || !onScroll) return;
    bScroll.current.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.current && bScroll.current.off('scroll');
    };
  }, [onScroll, bScroll]);
  // 如果bScroll实例不为空且传入pullUp 为bScroll绑定事件
  useEffect(() => {
    if (!bScroll.current || !pullUp) return;
    bScroll.current.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.current.y <= bScroll.current.maxScrollY + 100) {
        // pullUp();
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.current && bScroll.current.off('scrollEnd');
    };
  }, [pullUp, bScroll, pullUpDebounce]);
  // 如果bScroll实例不为空且传入pullDown 为bScroll绑定事件
  useEffect(() => {
    if (!bScroll.current || !pullDown) return;
    bScroll.current.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        // pullDown();
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.current && bScroll.current.off('touchEnd');
    };
  }, [pullDown, bScroll, pullDownDebounce]);
  // 每次重新渲染都要刷新实例，防止无法滑动:
  useEffect(() => {
    if (refresh && bScroll.current) {
      bScroll.current.refresh();
    }
  });
  // 如果数据变化，则刷新bScroll
  useEffect(() => {
    bScroll.current && bScroll.current.refresh();
  }, [data, bScroll]);
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll.current) {
        bScroll.current.refresh();
        bScroll.current.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll.current) {
        return bScroll.current;
      }
    },
  }));
  const _initScroll = () => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    bScroll.current = scroll;
    // setBScroll(scroll);
  };
  const PullUpDisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' };
  const PullDownDisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' };
  return (
    <ScrollContainer className="scroll" ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      <PullDownLoading style={PullDownDisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  data: null,
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向上吸顶
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  data: PropTypes.array,
};
export default memo(Scroll);
