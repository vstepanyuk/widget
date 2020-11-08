import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createApolloClient from './lib/apollo'
import { ApolloProvider } from '@apollo/client';

export function init({ apiUrl, apiKey, element, meta }) {
  ReactDOM.render(
    <ApolloProvider client={createApolloClient(apiUrl, apiKey)}>
      <App meta={meta ?? {}} />
    </ApolloProvider>,
    element ?? document.getElementById('subscriptions')
  );
}
