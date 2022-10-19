// before 18
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render((<div>react</div>), document.getElementById('root'));

import React from 'react';
import { createRoot } from 'react-dom/client';

import { WeatherForecast } from './pages';

createRoot(document.getElementById('root')).render((<WeatherForecast />));

