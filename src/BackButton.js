import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import Button from '@material-ui/core/Button';

const BackButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Button
                variant="contained"
                color="default">
                Back
                </Button>
        </Link>
    )
}

export default BackButton;