import React from 'react';
import { Link } from 'react-router-dom';
import categoryImage from './img/home-restaurant.gif';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const CategoryItem = (props) => {
    return (
        <div>
            <Link to={"/dishes/" + props.category.id}>
                <Card className="bg-dark text-white" style={{ marginBottom: 30 }}>
                    <Card.Img variant="top" src={categoryImage} style={{ width: 320, height: 220, opacity: 0.33 }} />
                    <Card.ImgOverlay>
                        <div className="text">
                            <Card.Title style={{fontSize: 25}}>{props.category.name}</Card.Title>
                        </div>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </div >
    )
}

export default CategoryItem;