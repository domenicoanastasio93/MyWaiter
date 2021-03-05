import React, { useState, useEffect } from 'react';
import './App.css';
import BackButton from './BackButton.js';
import LanguageButton from './LanguageButton.js';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [notes, setNotes] = useState([]);
    const [table, setTable] = useState([]);
    const [inError, setInError] = React.useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const dialogOpen = () => {
        if (table === null || table === '' || table.length === 0) {
            setInError(true);
            setOpenErrorSnackbar(true);
        } else {
            setOpenDialog(true);
        }
    };
    const dialogClose = () => {
        setOpenDialog(false);
    };

    const alertClasses = useAlertStyles();
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const snackbarSuccessClose = (event, reason) => {
        setOpenSuccessSnackbar(false);
    };
    const snackbarErrorClose = (event, reason) => {
        setOpenErrorSnackbar(false);
    };

    useEffect(() => {
        const newList = JSON.parse(localStorage.getItem('order'));
        setOrderList(newList);
    }, []);

    const removeDishFromOrder = (subIndex, index) => {
        var newList = [...orderList];
        newList.map((item, i) => {
            if (i === index) {
                item.dishes.splice(subIndex, 1);
            }
        })
        setOrderList(newList);
        localStorage.setItem('order', JSON.stringify(newList));
    }

    const finalizeOrder = () => {
        localStorage.setItem('additiveNotes', notes);
        localStorage.setItem('table', table);

        fetch('http://localhost:8080/myWaiter/finalizeOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: JSON.parse(localStorage.getItem('order')),
                notes: notes,
                table: table
            })
        })

        localStorage.setItem('finalized', 'OK');
        setOpenDialog(false);
        setOpenSuccessSnackbar(true);
    }

    const onChangeNotes = (e) => {
        setNotes(e.target.value)
    }
    const onChangeTable = (e) => {
        setTable(e.target.value)
        setInError(false);
    }

    return (
        <div className="home">
            {useEffect(() => {
                var tot = 0;
                orderList.map((item, index) => {
                    tot = tot + item.dishes.reduce((tempTot, subItem) => tempTot = tempTot + subItem.price, 0);
                })
                setTotalPrice(tot);
            })};

            <div className="rowList">
                <AppBar position="fixed">
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        <span></span>
                        <BackButton></BackButton>
                        <LanguageButton></LanguageButton>
                    </Toolbar>
                </AppBar>
            </div>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '70%', fontWeight: "bold" }}>Dish</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {orderList.map((item, index) => {
                        if (item.dishes && item.dishes.length > 0) {
                            return (
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ width: '70%', fontWeight: "bold" }}>{item.categoryName}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {item.dishes.map((subItem, subIndex) => (
                                        <TableRow>
                                            <TableCell style={{ width: '70%' }}>{subItem.name}</TableCell>
                                            <TableCell>{subItem.price}</TableCell>
                                            <TableCell>
                                                {localStorage.getItem('finalized') === 'no'
                                                    ? <IconButton
                                                        aria-label="delete"
                                                        color="secondary"
                                                        onClick={() => removeDishFromOrder(subIndex, index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    : <span></span>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )
                        }
                    })}
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>TOTAL</TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>{totalPrice} €</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <br />

            <div>
                {localStorage.getItem('finalized') === 'no'
                    ? <TextField
                        label="Additional notes"
                        multiline
                        rows={8}
                        value={notes}
                        variant="outlined"
                        onChange={onChangeNotes}
                    />
                    : <TextField
                        disabled
                        label="Additional notes"
                        multiline
                        rows={8}
                        value={localStorage.getItem('additiveNotes')}
                        variant="outlined"
                        onChange={onChangeNotes}
                    />
                }
            </div>

            <div className="rowList">
                {localStorage.getItem('finalized') === 'no'
                    ? (!inError
                        ? <TextField
                            label="Table n."
                            type="number"
                            value={table}
                            variant="outlined"
                            onChange={onChangeTable}
                            inputProps={{ style: { textAlign: 'center' } }}
                            style={{ width: 100 }}
                        />
                        : <TextField
                            error
                            label="Table n."
                            type="number"
                            value={table}
                            variant="outlined"
                            onChange={onChangeTable}
                            inputProps={{ style: { textAlign: 'center' } }}
                            style={{ width: 100 }}
                        />
                    )
                    : <TextField
                        disabled
                        label="Table n."
                        type="number"
                        value={localStorage.getItem('table')}
                        variant="outlined"
                        onChange={onChangeTable}
                        inputProps={{ style: { textAlign: 'center' } }}
                        style={{ width: 100 }}
                    />
                }

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 40 }}
                    onClick={dialogOpen}>
                    Finalize order
                </Button>
            </div>

            <Dialog
                open={openDialog}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to finalize the order?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={finalizeOrder} color="primary" autoFocus>
                        Finalize
                        </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={snackbarSuccessClose}>
                <Alert className={alertClasses.cookieAlert} onClose={snackbarSuccessClose} severity="success" variant="filled">
                    Order finalized
                   </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={snackbarErrorClose}>
                <Alert className={alertClasses.cookieAlert} onClose={snackbarErrorClose} severity="error" variant="filled">
                    Table field is required
                   </Alert>
            </Snackbar>
        </div >
    )
}

export default Order;