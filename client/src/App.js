import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
