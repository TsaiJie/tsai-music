import { Fragment } from 'react';
import ResetStyle from './assets/reset';
import BaseStyle from './assets/base'
function App() {
  return (
    <Fragment>
      <ResetStyle />
      <BaseStyle />
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
