import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import TripMap from './pages/TripMap';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Trip from "./pages/TripPage";
import Signup from "./pages/Signup";
import TripDashboard from "./pages/TripDashboard";
import Contact from "./pages/Contact";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <div className="d-flex flex-column min-vh-100">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {user && <Route path="/map" element={<TripMap/>} />}
            {!user && <Route path="/login" element={<Login />} />} 
            {!user && <Route path="/signup" element={<Signup />} />}
            {user && <Route path="/trips/:tripId" element={<Trip />} />}
            <Route path="/trips/" element={<TripDashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;