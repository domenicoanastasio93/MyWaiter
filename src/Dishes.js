import React, { useState, useEffect } from 'react';
import BackButton from './BackButton.js';
import OrderButton from './OrderButton.js';
import LanguageButton from './LanguageButton.js';
import DishItem from './DishItem.js';
import './App.css';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Dishes = (props) => {
    const [dishes, setDishes] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [categoryAdditiveNotes, setCategoryAdditiveNotes] = useState([]);

    useEffect(() => {
        const jsonById = require('./json/dishes' + props.match.params.id + '.json');
        setCategoryId(jsonById.categoryId);
        setCategoryName(jsonById.categoryName);
        setDishes(jsonById.dishes);
        setCategoryAdditiveNotes(jsonById.categoryAdditiveNotes);
    });

    return (
        <div className="home">
            <div className="rowList">
                <AppBar position="fixed">
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        <span></span>
                        <div>
                            <BackButton></BackButton>
                            <OrderButton></OrderButton>
                        </div>
                        <LanguageButton></LanguageButton>
                    </Toolbar>
                </AppBar>
            </div>

            <br />

            <Typography gutterBottom variant="h4" component="h2">
                {categoryName}
            </Typography>

            <div className="rowList">
                {dishes.map((item, index) => (
                    <DishItem key={index} dish={item} categoryId={categoryId} index={index} />
                ))}
            </div>

            <Typography gutterBottom variant="body1" component="h2">
                {categoryAdditiveNotes}
            </Typography>

            <span></span>
        </div>
    )
}

export default Dishes;