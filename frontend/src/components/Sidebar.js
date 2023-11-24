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

    return (
        <Dock
            isVisible={opened}
            onVisibleChange={(visible) => {
                setOpened(visible)
            }}
            position="right"
        >
            <div className="container-fluid h-100 pt-4 sidebar">
                <h5>Meu Carrinho ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h5>

                <div className="row products">

                    {cartItems.map((p) => (
                        <Cart key={p._id} product={p} />
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

