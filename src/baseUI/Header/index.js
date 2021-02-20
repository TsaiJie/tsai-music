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
const Marquee = styled.div`
  @keyframes marquee {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  .text {
    position: absolute;
    animation: marquee 6s linear infinite;
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`;
const Header = forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <Marquee>
          <h1 className="text">{title}</h1>
        </Marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});
Header.defaultProps = {
  handleClick: () => {},
  title: '标题',
  isMarquee: false,
};
Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
};
export default memo(Header);
