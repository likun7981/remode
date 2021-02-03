import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Models from './models';

ReactDOM.render(
  <Models.Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Models.Provider>,
  document.getElementById('root'),
);
