import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TransactionProvider } from './context/TransactionContext';
import { DeviceTypeProvider } from './context/DeviceTypeContext';
import { CampaignProvider } from './context/CampaignContext';

ReactDOM.render(
  <DeviceTypeProvider>
    <CampaignProvider>
      <TransactionProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TransactionProvider>
    </CampaignProvider>
  </DeviceTypeProvider>,
  document.getElementById('root')
);