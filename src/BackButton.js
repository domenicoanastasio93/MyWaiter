import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

import Button from '@material-ui/core/Button';

const BackButton = () => {
    const [buttonLabel, setButtonLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setButtonLabel("Back");
        } else if (localStorage.getItem('lang') === 'it') {
            setButtonLabel("Indietro");
        }
    }, []);

    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Button
                variant="contained"
                color="default">
                {buttonLabel}
            </Button>
        </Link>
    )
}

export default BackButton;