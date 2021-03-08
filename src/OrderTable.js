import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const OrderTable = () => {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        const newList = JSON.parse(localStorage.getItem('order'));
        setOrderList(newList);
    }, []);

    const [tableHeaderLabels, setTableHeaderLabels] = useState([]);
    const [totalLabel, setTotalLabel] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('lang') === 'en') {
            setTableHeaderLabels(["Dish", "Price"]);
            setTotalLabel("TOTAL");
        } else if (localStorage.getItem('lang') === 'it') {
            setTableHeaderLabels(["Piatto", "Prezzo"]);
            setTotalLabel("TOTALE");
        }
    }, []);

    const [totalPrice, setTotalPrice] = useState([]);

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

    return (
        <TableContainer component={Paper}>
            {useEffect(() => {
                var tot = 0;
                orderList.map((item) => {
                    tot = tot + item.dishes.reduce(
                        (tempTot, subItem) => tempTot = tempTot + subItem.price, 0
                    );
                })
                setTotalPrice(tot);
            })};

            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{ width: '70%', fontWeight: "bold" }}>
                            {tableHeaderLabels[0]}
                        </TableCell>
                        <TableCell
                            style={{ fontWeight: "bold" }}>
                            {tableHeaderLabels[1]}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {orderList.map((item, index) => {
                    if (item.dishes && item.dishes.length > 0) {
                        return (
                            <TableBody>
                                <TableRow>
                                    {localStorage.getItem('lang') === 'en'
                                        ? <TableCell
                                            style={{ width: '70%', fontWeight: "bold" }}>
                                            {item.categoryNameEn}
                                        </TableCell>
                                        : [
                                            (localStorage.getItem('lang') === 'it'
                                                ? <TableCell
                                                    style={{ width: '70%', fontWeight: "bold" }}>
                                                    {item.categoryNameIt}
                                                </TableCell>
                                                : <TableCell></TableCell>
                                            )
                                        ]
                                    }
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                {item.dishes.map((subItem, subIndex) => (
                                    <TableRow>
                                        <TableCell
                                            style={{ width: '70%' }}>
                                            {subItem.name}
                                        </TableCell>
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
                        <TableCell
                            style={{ fontWeight: "bold" }}>
                            {totalLabel}
                        </TableCell>
                        <TableCell
                            style={{ fontWeight: "bold" }}>
                            {totalPrice} €
                            </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderTable;