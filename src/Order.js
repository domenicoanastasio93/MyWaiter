import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import './App.css';
import BackButton from './BackButton.js';
import LanguageButton from './LanguageButton.js';
import OrderTable from './OrderTable.js';



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
    const [notes, setNotes] = React.useState("");
    const [table, setTable] = useState([]);
    const [inError, setInError] = React.useState(false);

    const [openFinalizeOrderDialog, setOpenFinalizeOrderDialog] = React.useState(false);
    const dialogFinalizeOrderOpen = () => {
        if (table === null || table === '' || table.length === 0) {
            setInError(true);
            setOpenErrorSnackbar(true);
        } else {
            setOpenFinalizeOrderDialog(true);
        }
    };
    const dialogFinalizeOrderClose = () => {
        setOpenFinalizeOrderDialog(false);
    };

    const [openCancelOrderDialog, setOpenCancelOrderDialog] = React.useState(false);
    const dialogCancelOrderOpen = () => {
        setOpenCancelOrderDialog(true);
    };
    const dialogCancelOrderClose = () => {
        setOpenCancelOrderDialog(false);
    };

    const alertClasses = useAlertStyles();
    const [openFinalizeOrderSnackbar, setOpenFinalizeOrderSnackbar] = React.useState(false);
    const [openCancelOrderSnackbar, setOpenCancelOrderSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const snackbarFinalizeOrderClose = () => {
        setOpenFinalizeOrderSnackbar(false);
    };
    const snackbarCancelOrderClose = () => {
        setOpenCancelOrderSnackbar(false);
    };
    const snackbarErrorClose = () => {
        setOpenErrorSnackbar(false);
    };

    const [finalizeButtonLabels, setFinalizeButtonLabels] = useState([]);
    const [additiveNotesLabel, setAdditiveNotesLabel] = useState([]);
    const [tableLabel, setTableLabel] = useState([]);
    const [dialogLabels, setDialogLabels] = useState([]);
    const [snackbarLabels, setSnackbarLabels] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setFinalizeButtonLabels(["Finalize order", "Cancel order"]);
            setAdditiveNotesLabel("Additive notes");
            setTableLabel("Table n.");
            setDialogLabels([
                "Are you sure you want to finalize the order?",
                "Cancel",
                "Finalize",
                "Are you sure you want to cancel the order?",
                "No",
                "Yes"
            ]);
            setSnackbarLabels([
                "Order finalized",
                "Order canceled",
                "Field 'Table n.' is required!"
            ]);
        } else if (localStorage.getItem('lang') === 'it') {
            setFinalizeButtonLabels(["Finalizza ordine", "Annulla ordine"]);
            setAdditiveNotesLabel("Note aggiuntive");
            setTableLabel("Tavolo n.");
            setDialogLabels([
                "Sei sicuro di voler finalizzare l'ordine",
                "Annulla",
                "Finalizza",
                "Sei sicuro di voler annullare l'ordine",
                "No",
                "Si"
            ]);
            setSnackbarLabels([
                "Ordine finalizzato",
                "Ordine annullato",
                "Il campo 'Tavolo n.' è obbligatorio!"
            ]);
        }
    }, []);

    const finalizeOrder = () => {
        if (notes !== null && notes !== '' && notes.length > 0) {
            localStorage.setItem('additiveNotes', notes);
        }
        localStorage.setItem('table', table);

        fetch(localStorage.getItem('host') + '/mywaiter/orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderList: JSON.parse(localStorage.getItem('order')),
                additiveNotes: notes,
                table: table,
                id: localStorage.getItem('orderId')
            })
        })
            .then(res => res.json())
            .then((data) => {
                localStorage.setItem('orderId', data.id);
            });

        localStorage.setItem('finalized', 'yes');
        setOpenFinalizeOrderDialog(false);
        setOpenFinalizeOrderSnackbar(true);
    }

    const cancelOrder = () => {
        fetch(localStorage.getItem('host') + '/mywaiter/orders/' + localStorage.getItem('orderId'), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        localStorage.setItem('orderId', null);
        localStorage.setItem('finalized', 'no');
        setOpenCancelOrderDialog(false);
        setOpenCancelOrderSnackbar(true);
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
            <div className="rowList">
                <AppBar position="fixed">
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        <span></span>
                        <BackButton></BackButton>
                        <LanguageButton></LanguageButton>
                    </Toolbar>
                </AppBar>
            </div>

            <OrderTable></OrderTable>
            <br />

            <div>
                {localStorage.getItem('finalized') === 'no'
                    ? <TextField
                        label={additiveNotesLabel}
                        multiline
                        rows={8}
                        value={notes}
                        variant="outlined"
                        onChange={onChangeNotes} />
                    : <TextField
                        disabled
                        label={additiveNotesLabel}
                        multiline
                        rows={8}
                        value={localStorage.getItem('additiveNotes')}
                        variant="outlined"
                        onChange={onChangeNotes} />
                }
            </div>

            <div className="rowList">
                {localStorage.getItem('finalized') === 'no'
                    ? (!inError
                        ? <TextField
                            label={tableLabel}
                            type="number"
                            value={table}
                            variant="outlined"
                            onChange={onChangeTable}
                            inputProps={{ style: { textAlign: 'center' } }}
                            style={{ width: 100 }} />
                        : <TextField
                            error
                            label={tableLabel}
                            type="number"
                            value={table}
                            variant="outlined"
                            onChange={onChangeTable}
                            inputProps={{ style: { textAlign: 'center' } }}
                            style={{ width: 100 }} />
                    )
                    : <TextField
                        disabled
                        label={tableLabel}
                        type="number"
                        value={localStorage.getItem('table')}
                        variant="outlined"
                        onChange={onChangeTable}
                        inputProps={{ style: { textAlign: 'center' } }}
                        style={{ width: 100 }} />
                }

                {localStorage.getItem('finalized') === 'no'
                    ?
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 40 }}
                        onClick={dialogFinalizeOrderOpen}>
                        {finalizeButtonLabels[0]}
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 40 }}
                        onClick={dialogCancelOrderOpen}>
                        {finalizeButtonLabels[1]}
                    </Button>
                }
            </div>

            <Dialog
                open={openFinalizeOrderDialog}
                onClose={dialogFinalizeOrderClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogLabels[0]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogFinalizeOrderClose} color="primary">
                        {dialogLabels[1]}
                    </Button>
                    <Button onClick={finalizeOrder} color="primary" autoFocus>
                        {dialogLabels[2]}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openCancelOrderDialog}
                onClose={dialogCancelOrderClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogLabels[3]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCancelOrderClose} color="primary">
                        {dialogLabels[4]}
                    </Button>
                    <Button onClick={cancelOrder} color="primary" autoFocus>
                        {dialogLabels[5]}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openFinalizeOrderSnackbar} autoHideDuration={3000} onClose={snackbarFinalizeOrderClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarFinalizeOrderClose}
                    severity="success"
                    variant="filled">
                    {snackbarLabels[0]}
                </Alert>
            </Snackbar>
            <Snackbar open={openCancelOrderSnackbar} autoHideDuration={3000} onClose={snackbarCancelOrderClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarCancelOrderClose}
                    severity="success"
                    variant="filled">
                    {snackbarLabels[1]}
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={snackbarErrorClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarErrorClose}
                    severity="error"
                    variant="filled">
                    {snackbarLabels[2]}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Order;