import React, { useState, useEffect } from 'react';

import './App.css';
import BackButton from './BackButton.js';
import LanguageButton from './LanguageButton.js';
import OrderTable from './OrderTable.js';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    const snackbarSuccessClose = () => {
        setOpenSuccessSnackbar(false);
    };
    const snackbarErrorClose = () => {
        setOpenErrorSnackbar(false);
    };

    const [finalizeButtonLabel, setFinalizeButtonLabel] = useState([]);
    const [additiveNotesLabel, setAdditiveNotesLabel] = useState([]);
    const [tableLabel, setTableLabel] = useState([]);
    const [dialogLabels, setDialogLabels] = useState([]);
    const [snackbarLabels, setSnackbarLabels] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setFinalizeButtonLabel("Finalize order");
            setAdditiveNotesLabel("Additive notes");
            setTableLabel("Table n.");
            setDialogLabels(["Are you sure you want to finalize the order?", "Cancel", "Finalize"]);
            setSnackbarLabels(["Order finalized", "Field 'Table n.' is required!"]);
        } else if (localStorage.getItem('lang') === 'it') {
            setFinalizeButtonLabel("Finalizza ordine");
            setAdditiveNotesLabel("Note aggiuntive");
            setTableLabel("Tavolo n.");
            setDialogLabels(["Sei sicuro di voler finalizzare l'ordine", "Annulla", "Finalizza"]);
            setSnackbarLabels(["Ordine finalizzato", "Il campo 'Tavolo n.' è obbligatorio!"]);
        }
    }, []);

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

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 40 }}
                    onClick={dialogOpen}>
                    {finalizeButtonLabel}
                </Button>
            </div>

            <Dialog
                open={openDialog}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogLabels[0]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        {dialogLabels[1]}
                    </Button>
                    <Button onClick={finalizeOrder} color="primary" autoFocus>
                        {dialogLabels[2]}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={snackbarSuccessClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarSuccessClose}
                    severity="success"
                    variant="filled">
                    {snackbarLabels[0]}
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={snackbarErrorClose}>
                <Alert
                    className={alertClasses.cookieAlert}
                    onClose={snackbarErrorClose}
                    severity="error"
                    variant="filled">
                    {snackbarLabels[1]}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Order;