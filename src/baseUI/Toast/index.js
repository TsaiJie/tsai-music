import React, { memo, forwardRef, useState, useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ToastWrapper } from './style';
export default memo(
  forwardRef(function Toast(props, ref) {
    const { text = '默认文字' } = props;
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState('');
    //外面组件拿函数组件ref的方法，用useImperativeHandle这个hook
    useImperativeHandle(ref, () => ({
      show() {
        // 做防抖处理
        if (timer) clearTimeout(timer);
        setShow(true);
        setTimer(
          setTimeout(() => {
            setShow(false);
          }, 3000)
        );
      },
    }));
    return (
      <CSSTransition
        in={show}
        timeout={300}
        classNames="drop"
        unmountOnExit
        mountOnEnter
      >
        <ToastWrapper>
          <div className="text">{text}</div>
        </ToastWrapper>
      </CSSTransition>
    );
  })
);
