import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createApolloClient from './lib/apollo'
import { ApolloProvider } from '@apollo/client';

export function init({ apiUrl, apiKey, element, meta, isLoggedIn = false, buttonStyles } = {}) {
  ReactDOM.render(
    <ApolloProvider client={createApolloClient(apiUrl, apiKey)}>
      <App meta={meta ?? {}} isLoggedIn={isLoggedIn} buttonStyles={buttonStyles} />
    </ApolloProvider>,
    element ?? document.getElementById('subscriptions')
  );
}
