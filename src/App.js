import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import News from './Components/News/News';
import Destination from './Components/Destination/Destination';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Booking from './Components/Booking/Booking';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header/>
      <Switch>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/book">
          <Booking/>
        </Route>
        <Route path="/news">
          <News/>
        </Route>
        <PrivateRoute path="/destination">
          <Destination/>
        </PrivateRoute>
        <Route path="/blog">
          <Blog/>
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path = "*">
          <NotFound/>
        </Route>
      </Switch>  
    </Router>
    </userContext.Provider>
  );
}

export default App;
