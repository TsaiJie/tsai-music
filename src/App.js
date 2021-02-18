import { Fragment } from 'react';
import ResetStyle from '@/assets/reset';
import BaseStyle from '@/assets/base';
import { IconStyle } from '@/assets/iconfont/iconfont';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
function App() {
  return (
    <HashRouter>
      <ResetStyle />
      <BaseStyle />
      <IconStyle />
      {renderRoutes(routes)}
    </HashRouter>
  );
}

export default App;
