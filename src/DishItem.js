import React from 'react';
import categoryImage from './img/home-restaurant.gif';
import './App.css';

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
    const snackbarClose = (event, reason) => {
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
        orderList.map((item, index) => {
            if (item.categoryId === props.categoryId) {
                const newDishes = [...item.dishes, props.dish];
                item.dishes = newDishes;
            }
        });
        localStorage.setItem('order', JSON.stringify(orderList));

        setOpenDialog(false);
        setOpenSnackbar(true);
    }

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
                        {props.dish.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: {props.dish.price} €
                    </Typography>
                </CardContent>
            </CardActionArea>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={snackbarClose}>
                <Alert className={alertClasses.cookieAlert} onClose={snackbarClose} severity="success" variant="filled">
                    {props.dish.name} added to order
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
                        Do you want to add {props.dish.name} to order?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={addDishToOrder} color="primary" autoFocus>
                        Add
                        </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}

export default DishItem;