import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import NoMatch from "./pages/NoMatch";
import ConfirmEmail from "./pages/ConfirmEmail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

const httpLink = createHttpLink({
	uri: 'http://localhost:3001/graphql',
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
	cache: new InMemoryCache()
});
console.log(client.cache)
function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="app">
					<Header />
					<div id="container">
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
							<Route path="/profile" element={<Profile />} >
								<Route path=':username' element={<Profile />} />
							</Route>
							<Route path="/post">
								<Route path=":id" element={<SinglePost />} />
							</Route>
							<Route path="/confirmation">
								<Route path=":token" element={<ConfirmEmail />} />
							</Route>
							<Route path="*" element={<NoMatch />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
