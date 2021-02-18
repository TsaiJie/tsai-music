import { Fragment } from 'react';
import ResetStyle from '@/assets/reset';
import BaseStyle from '@/assets/base';
import { IconStyle } from '@/assets/iconfont/iconfont';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import store from '@/store';
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ResetStyle />
        <BaseStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
