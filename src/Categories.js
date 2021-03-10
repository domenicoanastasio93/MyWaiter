import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect, useState } from 'react';
import './App.css';
import CategoryItem from './CategoryItem.js';
import LanguageButton from './LanguageButton.js';
import OrderButton from './OrderButton.js';

const Categories = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(localStorage.getItem('host') + '/mywaiter/categories', {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        if (localStorage.getItem('order') === null || localStorage.getItem('order').length === 0) {
          var order = [];
          data.map((item) => {
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
        setCategories(data);
      })
  }, [])

  useEffect(() => {

  })

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
