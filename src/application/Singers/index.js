import React, { memo } from 'react';
import { categoryTypes } from '@/api/config';
import HorizonScroll from '@/baseUI/HorizonScroll';
export default memo(function Singers() {
  return (
    <HorizonScroll
      list={categoryTypes}
      title={'分类 (默认热门):'}
    ></HorizonScroll>
  );
});
