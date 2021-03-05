import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home.js';
import Dishes from './Dishes.js';
import Order from './Order.js';

const App = () => {
  const finalized = localStorage.getItem('finalized');
  const lang = localStorage.getItem('lang');
  if (finalized === null || finalized.length === 0 || finalized === 'no') {
    localStorage.setItem('finalized', 'no');
  }
  if (lang === null || lang.length === 0 || lang === '') {
    localStorage.setItem('lang', 'en');
  }

  return (
    <div>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/dishes/:id" component={Dishes}></Route>
        <Route exact path="/order" component={Order}></Route>
      </Router>
    </div>
  )
}

export default App;
