import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TransactionProvider } from './context/TransactionContext';
import { DeviceTypeProvider } from './context/DeviceTypeContext';

ReactDOM.render(
  <DeviceTypeProvider>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </DeviceTypeProvider>,
  document.getElementById('root')
);