import React, { memo } from 'react';
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
  return (
    <NavContainer>
      <HorizonScroll list={categoryTypes} title={'分类 (默认热门):'} />
      <HorizonScroll list={alphaTypes} title={'首字母:'} />
    </NavContainer>
  );
});
