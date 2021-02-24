import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from '../Scroll';
import { PropTypes } from 'prop-types';
import style from '@/assets/global-style';
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  > span {
    color: ${style['color-text-ll']}
  }
  > span:first-of-type {
    display: inline-block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-medium']};
  -webkit-transform: rotate(0deg);
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style['color-theme']};
    border: 1px solid ${style['color-theme']};
    opacity: 0.8;
  }
`;
const Horizon = (props) => {
  const { list, value, title } = props;
  const { handleClick } = props;
  const categoryRef = useRef(null);
  const scrollRef = useRef(null)
  useEffect(() => {
    let categoryDOM = categoryRef.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
    scrollRef.current.refresh();
  }, []);

  return (
    <Scroll direction={'horizontal'} data={list} ref={scrollRef}>
      <div ref={categoryRef} >
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${value === item.key ? 'selected' : ''}`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
};

// 首先考虑接受的参数
//list 为接受的列表数据
//value 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizon.defaultProps = {
  list: [],
  value: '',
  title: '',
  handleClick: null,
};
Horizon.propTypes = {
  list: PropTypes.array,
  value: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};
export default memo(Horizon);
