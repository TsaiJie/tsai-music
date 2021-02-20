import React, { memo, forwardRef } from 'react';
import styled from 'styled-components';
import style from '@/assets/global-style';
import PropTypes from 'prop-types';

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 100;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  display: flex;
  line-height: 40px;
  color: ${style['color-text-ll']};
  .back {
    margin-right: 5px;
    font-size: ${style['font-size-large']};
    width: 20px;
  }
  > h1 {
    font-size: ${style['font-size-large']};
    font-weight: 700;
  }
`;

const Header = forwardRef((props, ref) => {
  const { handleClick, title } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </HeaderContainer>
  );
});
Header.defaultProps = {
  handleClick: () => {},
  title: '标题',
};
Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
};
export default memo(Header);
