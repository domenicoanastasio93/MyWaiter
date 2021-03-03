import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem.js';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let categoriesJson = require('./json/categories.json');
    setCategories(categoriesJson);
  })

  return (
    <div className="home">
      <div className="categories">
        <CardDeck>
          {categories.map((item, index) => (
            <CategoryItem key={index} category={item} index={index} />
          ))}
        </CardDeck>
      </div>

      <div className="button">
        <Link to="/order">
          <Button size="lg">Go to order</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home;
