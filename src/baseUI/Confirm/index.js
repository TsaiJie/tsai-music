import React, { memo, forwardRef, useState, useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ConfirmWrapper } from './style';
export default memo(
  forwardRef(function Confirm(props, ref) {
    const [show, setShow] = useState(false);
    const { text, cancelBtnText, confirmBtnText } = props;
    const { handleConfirm } = props;
    useImperativeHandle(ref, () => ({
      show() {
        setShow(true);
      },
    }));
    return (
      <CSSTransition
        classNames="confirm-fade"
        timeout={400}
        in={show}
        mountOnEnter
        unmountOnExit
      >
        <ConfirmWrapper onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="confirm_content">
              <p className="text">{text}</p>
              <div className="operate">
                <div
                  className="operate_btn left"
                  onClick={() => setShow(false)}
                >
                  {cancelBtnText}
                </div>
                <div
                  className="operate_btn"
                  onClick={() => {
                    setShow(false);
                    handleConfirm();
                  }}
                >
                  {confirmBtnText}
                </div>
              </div>
            </div>
          </div>
        </ConfirmWrapper>
      </CSSTransition>
    );
  })
);
