import React from 'react'
import Services from './Services';
import Products from './Products';
import Signup from './Signup';
import Home from './Home';
import Navbar from '../components/Navbar';
import '../css/HomeApp.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function HomeApp() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={Signup} />
        </Switch>
      </Router>
    </>
  );
}

export default HomeApp;
