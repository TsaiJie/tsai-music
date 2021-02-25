import React, { memo, forwardRef } from 'react';
import { ConfirmWrapper } from './style';
export default memo(
  forwardRef(function Confirm(props, ref) {
    const { text, cancelBtnText, confirmBtnText } = props;
    return (
      <ConfirmWrapper>
        <div>
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate_btn left">{cancelBtnText}</div>
              <div className="operate_btn">{confirmBtnText}</div>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    );
  })
);
