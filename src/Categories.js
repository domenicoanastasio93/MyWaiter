import React, { useState, useEffect } from 'react';

import './App.css';
import CategoryItem from './CategoryItem.js';
import LanguageButton from './LanguageButton.js';
import OrderButton from './OrderButton.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesJson = require('./json/categories.json');
    setCategories(categoriesJson);

    if (localStorage.getItem('order') === null) {
      var order = [];

      categoriesJson.map((item) => {
        var item = {
          categoryId: item.id,
          categoryNameEn: item.nameEn,
          categoryNameIt: item.nameIt,
          dishes: []
        }
        if (order === null || order.length === 0) {
          order = [item]
        } else {
          order = [...order, item]
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

export default Categories;
