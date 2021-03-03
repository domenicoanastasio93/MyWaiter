import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const BackButton = () => {
    return (
        <Link to="/">
            <div className="button">
                <Button size="lg">Back</Button>
            </div>
        </Link>
    )
}

export default BackButton;