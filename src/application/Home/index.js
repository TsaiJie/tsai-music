import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Top, TabContainer } from './style';

export default memo(function Home(props) {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <TabContainer className="tab">
        <NavLink to="/recommend" className="tab-item">
          <span> 推荐 </span>
        </NavLink>
        <NavLink to="/singers" className="tab-item">
          <span> 歌手 </span>
        </NavLink>
        <NavLink to="/rank" className="tab-item">
          <span> 排行 </span>
        </NavLink>
      </TabContainer>
      {renderRoutes(props.route.routes)}
    </div>
  );
});
