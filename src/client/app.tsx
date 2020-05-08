import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from '../shared/components/App';

loadableReady(() => {
  hydrate(<App />, document.getElementById('app'));
});

if (module.hot) {
  module.hot.accept();
}
