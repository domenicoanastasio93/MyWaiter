import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Categories from './Categories.js';
import Dishes from './Dishes.js';
import Order from './Order.js';

const App = () => {
  const host = useState("http://localhost:8080");

  const finalized = localStorage.getItem('finalized');
  if (finalized === null || finalized.length === 0 || finalized === 'no') {
    localStorage.setItem('finalized', 'no');
  }

  const lang = localStorage.getItem('lang');
  if (lang === null || lang.length === 0 || lang === 'en') {
    localStorage.setItem('lang', 'en');
  }

  localStorage.setItem('host', "http://localhost:8080");

  return (
    <div>
      <Router>
        <Route exact path="/" component={Categories}></Route>
        <Route exact path="/dishes/:id" component={Dishes}></Route>
        <Route exact path="/order" component={Order}></Route>
      </Router>
    </div>
  )
}

export default App;
