import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import './App.css';
import BackButton from './BackButton.js';
import DishItem from './DishItem.js';
import LanguageButton from './LanguageButton.js';
import OrderButton from './OrderButton.js';



const Dishes = (props) => {
    const [dishes, setDishes] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [categoryAdditiveNotes, setCategoryAdditiveNotes] = useState([]);

    useEffect(() => {
        fetch(localStorage.getItem('host') + '/mywaiter/categories/' + props.match.params.id, {
            method: "GET"
        })
            .then(res => res.json())
            .then((data) => {
                setCategoryId(data.id);
                if (localStorage.getItem('lang') === 'en') {
                    setCategoryName(data.nameEn);
                    setCategoryAdditiveNotes(data.additiveNotesEn);
                } else if (localStorage.getItem('lang') === 'it') {
                    setCategoryName(data.nameIt);
                    setCategoryAdditiveNotes(data.additiveNotesIt);
                }
            })
    }, [])

    useEffect(() => {
        fetch(localStorage.getItem('host') + '/mywaiter/dishes/category/' + props.match.params.id, {
            method: "GET"
        })
            .then(res => res.json())
            .then((data) => {
                setDishes(data);
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
                    <DishItem
                        key={index}
                        dish={item}
                        categoryId={categoryId}
                        index={index} />
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