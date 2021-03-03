import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryImage from './img/home-restaurant.gif';
import BackButton from './BackButton.js';
import DishItem from './DishItem.js';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

const Dishes = (props) => {
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        let jsonById = require('./json/dishes' + props.match.params.id + '.json');
        setDishes(jsonById);
    })

    return (
        <div className="home">
            <BackButton></BackButton>

            <div className="categories">
                <CardDeck>
                    {dishes.map((item, index) => (
                        <DishItem key={index} dish={item} index={index} />
                    ))}
                </CardDeck>
            </div >

            <div className="button">
                <Link to="/order">
                    <Button size="lg">Go to order</Button>
                </Link>
            </div>
        </div>
    )
}

export default Dishes;