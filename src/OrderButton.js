import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

import Button from '@material-ui/core/Button';

const OrderButton = () => {
    const [buttonLabel, setButtonLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setButtonLabel("Go to order");
        } else if (localStorage.getItem('lang') === 'it') {
            setButtonLabel("Vai all'ordine");
        }
    }, []);

    return (
        <Link to="/order" style={{ textDecoration: "none" }}>
            <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="default">
                {buttonLabel}
            </Button>
        </Link>
    )
}

export default OrderButton;