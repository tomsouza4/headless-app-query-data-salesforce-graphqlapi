import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://wise-goat-rgjb32-dev-ed.trailblaze.my.salesforce.com/services/data/v59.0/graphql'
});

const authLink = setContext((_, { headers }) => {

  // a valid token must be passed
  const token = "00D8b0000022ug0!AQ8AQPfZU4LwCekS0orjKcqRqxiEjQn74zXLowVTTDPxzYsm7LCp8h9naQQDjql5ie7TAYt2s1RY2N0Y50K7XMiav3gbijp4";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
