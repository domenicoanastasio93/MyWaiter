import React, { useEffect, useState } from 'react';

import './App.css';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const LanguageButton = () => {
    const [buttonLabel, setButtonLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setButtonLabel("Language");
        } else if (localStorage.getItem('lang') === 'it') {
            setButtonLabel("Lingua");
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseEnglish = () => {
        localStorage.setItem('lang', 'en');
        setAnchorEl(null);
        window.location.reload();
    }
    const handleCloseItalian = () => {
        localStorage.setItem('lang', 'it');
        setAnchorEl(null);
        window.location.reload();
    }

    return (
        <div>
            <Button color="inherit" onClick={handleClick}> {buttonLabel} </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseEnglish}>English</MenuItem>
                <MenuItem onClick={handleCloseItalian}>Italiano</MenuItem>
            </Menu>
        </div>
    )
}

export default LanguageButton;