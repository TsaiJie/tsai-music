import React, { memo, useCallback, useState } from 'react';
import { categoryTypes, alphaTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
import styled from 'styled-components';
import style from '@/assets/global-style';
export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
export default memo(function Singers() {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');
  const handleUpdateAlpha = useCallback((val) => {
    console.log(val);
    setAlpha(val);
  }, []);

  const handleUpdateCatetory = useCallback((val) => {
    console.log(val);
    setCategory(val);
  }, []);
  return (
    <NavContainer>
      <HorizonScroll
        list={categoryTypes}
        title={'分类 (默认热门):'}
        handleClick={handleUpdateCatetory}
        value={category.key}
      />
      <HorizonScroll
        list={alphaTypes}
        title={'首字母:'}
        handleClick={handleUpdateAlpha}
        value={alpha.key}
      />
    </NavContainer>
  );
});
