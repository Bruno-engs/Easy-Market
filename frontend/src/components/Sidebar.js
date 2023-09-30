import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dock } from 'react-dock';

import { useHistory } from 'react-router-dom'

//import { addToCart, removeFromCart } from '../actions/cartActions'
import { addToCart } from '../actions/cartActions'
import Cart from './Cart';

const Sidebar = ({ match, location }) => {
    const history = useHistory();

    const productId = match?.params.id

    const qty = location?.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [opened, setOpened] = useState(false);

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    useEffect(() => {
        window.addEventListener('openCart', () => {
            setOpened(true);
        });
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    /*
        const removeFromCartHandler = (id) => {
            dispatch(removeFromCart(id))
        }
    
        const checkoutHandler = () => {
            history.push('/login?redirect=shipping')
        }
    */
    return (
        <Dock
            isVisible={opened}
            onVisibleChange={(visible) => {
                setOpened(visible)
            }}
            position="right"
        >
            <div className="container-fluid h-100 pt-4 sidebar">
                <h5>Minha Sacola({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h5>

                <div className="row products">

                    {cartItems.map((p) => (
                        <Cart product={p} />
                    ))}

                </div>

                <div className="row align-items-end footer">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <b className="d-inline-block thicker fs-6">Total</b>
                        <h3 className="d-inline-block">R$
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}</h3>
                    </div>
                    <button
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                        className="btn btn-block btn-primary rounded-0 h-50 align-items-center">
                        Finalizar Compra</button>
                </div>
            </div>
        </Dock>
    );

};

export default Sidebar;

/*

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dock } from 'react-dock';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from './Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Sidebar = ({ match, location, history }) => {
    const productId = match?.params.id

    const qty = location?.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [opened, setOpened] = useState(false);


    useEffect(() => {
        window.addEventListener('openCart', () => {
            setOpened(true);
        });
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (

        <Row>
            <Dock
                isVisible={opened}
                onVisibleChange={(visible) => {
                    setOpened(visible)

                }}
                position="right"
            >
                <div className="container-fluid h-100 pt-4 sidebar">
                    <h5>Minha Sacola:({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h5>

                    <div className="row products">

                        <Col md={8}>
                            {cartItems.length === 0 ? (
                                <Message>
                                    Your cart is empty <Link to='/'>Go Back</Link>
                                </Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>${item.price}</Col>
                                                <Col md={2}>
                                                    <Form.Control
                                                        as='select'
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                addToCart(item.product, Number(e.target.value))
                                                            )
                                                        }
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Col md={2}>
                                                    <Button
                                                        type='button'
                                                        variant='light'
                                                        onClick={() => removeFromCartHandler(item.product)}
                                                    >
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Col>

                    </div>

                    <div className="row align-items-end footer">
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>
                                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                            items
                                        </h2>
                                        R$
                                        {cartItems
                                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                                            .toFixed(2)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn-block'
                                            disabled={cartItems.length === 0}
                                            onClick={checkoutHandler}
                                        >
                                            Proceed To Checkout
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </div>
                </div>
            </Dock>
        </Row>
    )
}

export default Sidebar;*/
