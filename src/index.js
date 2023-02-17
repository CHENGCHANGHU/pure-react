// before 18
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render((<div>react</div>), document.getElementById('root'));

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { ToolkitStore } from 'store/ToolkitStore';

import {
  WeatherForecast,
  ToolkitRoot,
  ZustandRoot,
  TestUseAsyncState,
} from 'src/pages';

createRoot(document.getElementById('root')).render((<WeatherForecast />));

createRoot(document.getElementById('toolkit-root')).render((
  <Provider store={ ToolkitStore }>
    toolkit-root
    <ToolkitRoot />
  </Provider>
));

createRoot(document.getElementById('zustand-root')).render((
  <>
    zustand-root
    <ZustandRoot />
  </>
));

createRoot(document.getElementById('use-async-state')).render((
  <>
    Test useAsyncState
    <TestUseAsyncState />
  </>
));



