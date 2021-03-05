import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import Button from '@material-ui/core/Button';

const OrderButton = () => {
    return (
        <Link to="/order" style={{ textDecoration: "none" }}>
            <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="default">
                Go to order
                </Button>
        </Link>
    )
}

export default OrderButton;