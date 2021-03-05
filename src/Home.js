import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem.js';
import OrderButton from './OrderButton.js';
import LanguageButton from './LanguageButton.js';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesJson = require('./json/categories.json');
    setCategories(categoriesJson);

    if (localStorage.getItem('order') === null) {
      var order = [];
      categoriesJson.map((item, index) => {
        if (order === null || order.length === 0) {
          order = [{
            categoryId: item.id,
            categoryName: item.name,
            dishes: []
          }]
        } else {
          order = [...order, {
            categoryId: item.id,
            categoryName: item.name,
            dishes: []
          }]
        }
      })
      localStorage.setItem('order', JSON.stringify(order));
    }
  }, [])

  return (
    <div className="home">
      <div className="rowList">
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <span></span>
            <OrderButton></OrderButton>
            <LanguageButton></LanguageButton>
          </Toolbar>
        </AppBar>
      </div>

      <div className="rowList">
        {categories.map((item, index) => (
          <CategoryItem key={index} category={item} index={index} />
        ))}
      </div>

      <span></span>
    </div>
  )
}

export default Home;
