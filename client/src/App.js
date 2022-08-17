import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import { offsetLimitPagination } from "@apollo/client/utilities";

const HOST = process.env.HOST || `http://localhost:3001`;

const httpLink = createHttpLink({
	uri: `${HOST}/graphql`,
});
  
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
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
	cache: new InMemoryCache({
		typePolicies: {
		  Query: {
			fields: {
			  posts: offsetLimitPagination()
			}
		  },
		  User: {
			fields: {
				friends: {
					merge(existing = [], incoming) {
						return [...existing, ...incoming];
					}
				}
			}
		  }
		}
	  })
});
console.log(client.cache)
function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="app">
					<Header />
					<AnimatedRoutes />
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
