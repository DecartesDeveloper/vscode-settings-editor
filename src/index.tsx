import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';
import registerServiceWorker from './registerServiceWorker';

import SearchableSettings from './components/Editor';
import Header from './components/Header';

const configuration = require('./configuration_full.json').settings;

ReactDOM.render(
  <div>
    <CssBaseline />
    <Header />
    <SearchableSettings settings={configuration} />
  </div>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
