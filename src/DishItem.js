import React from 'react';
import categoryImage from './img/home-restaurant.gif';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const DishItem = (props) => {

    const addDishToOrder = () => {
        var orderList = JSON.parse(localStorage.getItem('order'));

        if (orderList === null || orderList.length === 0) {
            orderList = [{ id: props.dish.id, name: props.dish.name, price: props.dish.price }];
            localStorage.setItem('order', JSON.stringify(orderList));
        } else {
            const newList = [...orderList, { id: props.dish.id, name: props.dish.name, price: props.dish.price }]
            localStorage.setItem('order', JSON.stringify(newList));
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <div>
                    {props.dish.description}
                </div>
                <br />
                <div>
                    Price: {props.dish.price} €
            </div>
            </Popover.Content>
        </Popover>
    );

    return (
        <Card className="text-center" style={{ marginBottom: 30 }}>
            <Card.Img variant="top" src={categoryImage} style={{ width: 'auto', height: 180 }} />
            <Card.Body>
                <Card.Title>{props.dish.name}</Card.Title>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="primary" size="sm">Infos</Button>
                </OverlayTrigger>
                <Button variant="primary" size="sm" onClick={() => addDishToOrder()} style={{ marginLeft: 10 }}>Add</Button>
            </Card.Body>
        </Card>
    )
}

export default DishItem;