import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OwLETEfjAgyUDiNiGq2gaZdMPnDKsbefK4dHvYLFhWAaBd3yEHh2A5LXXhWb1VspBq6JlC5B3K88UB2uptKbG7S00sgAtwtba');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
