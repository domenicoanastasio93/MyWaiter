import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import categoryImage from './img/home-restaurant.gif';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    image: {
        position: 'relative',
        height: 200,
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '2px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
}));

const CategoryItem = (props) => {
    const classes = useStyles();

    const [categoryNameLabel, setCategoryNameLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setCategoryNameLabel(props.category.nameEn);
        } else if (localStorage.getItem('lang') === 'it') {
            setCategoryNameLabel(props.category.nameIt);
        }
    }, []);

    return (
        <Link to={"/dishes/" + props.category.id} style={{ textDecoration: 'none' }}>
            <ButtonBase
                focusRipple
                key={categoryNameLabel}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: 320,
                    margin: 10
                }}
            >
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${categoryImage})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                        {categoryNameLabel}
                    </Typography>
                </span>
            </ButtonBase>
        </Link>
    )
}

export default CategoryItem;