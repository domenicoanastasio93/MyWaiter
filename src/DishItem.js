import React, { useEffect, useState } from 'react';

import './App.css';
import categoryImage from './img/home-restaurant.gif';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const useCardStyles = makeStyles({
    root: {
        width: 300,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    media: {
        height: 200
    }
});

const useAlertStyles = makeStyles({
    cookieAlert: {
        "& .MuiAlert-icon": {
            display: 'none'
        },
        "& .MuiAlert-action": {
            display: 'none'
        }
    }
});

const DishItem = (props) => {
    const cardClasses = useCardStyles();

    const alertClasses = useAlertStyles();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const snackbarClose = () => {
        setOpenSnackbar(false);
    };

    const [openDialog, setOpenDialog] = React.useState(false);
    const dialogOpen = () => {
        if (localStorage.getItem('finalized') === 'no') {
            setOpenDialog(true);
        }
    };
    const dialogClose = () => {
        setOpenDialog(false);
    };

    const addDishToOrder = () => {
        var orderList = JSON.parse(localStorage.getItem('order'));
        orderList.map((item) => {
            if (item.categoryId === props.categoryId) {
                const newDishes = [...item.dishes, props.dish];
                item.dishes = newDishes;
            }
        });
        localStorage.setItem('order', JSON.stringify(orderList));

        setOpenDialog(false);
        setOpenSnackbar(true);
    }

    const [descriptionLabel, setDescriptionLabel] = useState([]);
    const [priceLabel, setPriceLabel] = useState([]);
    const [dialogLabels, setDialogLabels] = useState([]);
    const [snackbarLabel, setSnackbarLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setDescriptionLabel(props.dish.descriptionEn);
            setPriceLabel("Price");
            setDialogLabels(["Do you want to add the dish to the order?", "Cancel", "Add"]);
            setSnackbarLabel("Dish added");
        } else if (localStorage.getItem('lang') === 'it') {
            setDescriptionLabel(props.dish.descriptionIt);
            setPriceLabel("Prezzo");
            setDialogLabels(["Aggiungere il piatto all'ordine?", "Annulla", "Aggiungi"]);
            setSnackbarLabel("Piatto aggiunto");
        }
    }, []);

    return (
        <Card className={cardClasses.root}>
            <CardActionArea onClick={dialogOpen}>
                <CardMedia
                    className={cardClasses.media}
                    image={categoryImage}
                    title={props.dish.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.dish.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {descriptionLabel}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {priceLabel}: {props.dish.price} €
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={snackbarClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarClose}
                    severity="success"
                    variant="filled">
                    {snackbarLabel}
                </Alert>
            </Snackbar>

            <Dialog
                open={openDialog}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogLabels[0]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        {dialogLabels[1]}
                    </Button>
                    <Button onClick={addDishToOrder} color="primary" autoFocus>
                        {dialogLabels[2]}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default DishItem;