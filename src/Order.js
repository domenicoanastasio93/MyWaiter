import React, { useState, useEffect } from 'react';
import './App.css';
import BackButton from './BackButton.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [notes, setNotes] = useState([]);
    const [table, setTable] = useState([]);

    useEffect(() => {
        const newList = JSON.parse(localStorage.getItem('order'));
        setOrderList(newList);
    }, []);

    const removeDishFromOrder = (index) => {
        var newList = [...orderList];
        newList.splice(index, 1);
        setOrderList(newList);
        localStorage.setItem('order', JSON.stringify(newList));
    }

    const finalizeOrder = () => {
        const newList = JSON.parse(localStorage.getItem('order'));

        fetch('http://localhost:8080/myWaiter/finalizeOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: newList,
                notes: notes,
                table: table
            })
        })

        localStorage.clear();
        window.location.reload();
    }

    const onChangeNotes = (e) => {
        setNotes(e.target.value)
    }

    const onChangeTable = (e) => {
        setTable(e.target.value)
    }

    return (
        <div className="home">
            {useEffect(() => {
                { orderList && setTotalPrice(orderList.reduce((tot, item) => tot = tot + item.price, 0)) }
            })}

            <BackButton></BackButton>

            <Table responsive className="bg-white text-center">
                <thead>
                    <tr>
                        <th>Dish</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList && orderList.map((item, index) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price} €</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => removeDishFromOrder(index)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ fontWeight: "bold" }}>TOTAL</td>
                        <td style={{ fontWeight: "bold" }}>{totalPrice} €</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>

            <div>
                <Form.Control as="textarea" value={notes} onChange={onChangeNotes} placeholder="Additional notes" style={{ height: 150 }}/>
            </div>
            <div>
                <Form.Control type="number" value={table} onChange={onChangeTable} placeholder="Table n." style={{ width: 100, height: 60, textAlign: "center" }} />
            </div>
            <div className="button" className="button">
                <Button size="lg" onClick={() => finalizeOrder()}>Finalize order</Button>
            </div>
        </div >
    )
}

export default Order;