//import { useDispatch, useSelector } from 'react-redux'  
import React, {  useRef } from "react";
//import { setShopMapSelected, setMapCenter } from '../store/modules/shop/actions'

import { useHistory } from 'react-router-dom'


const Store = ({ store }, { onClick = () => { }, onDoubleClick = () => { }, children }) => {
    


    //const dispatch = useDispatch();
    /*const { storeMapSelected } = useSelector((state) => state.shop);

    const list = useSelector((state) => state.shop)
    const { storeMapSelected } = list
    
    const setSelectedStore = () => {

        dispatch(setShopMapSelected(store?._id));
        dispatch(setMapCenter(store?.location));

    }*/

const history = useHistory();

const timer = useRef();

const onClickHandler = (event) => {
    clearTimeout(timer.current);
    if (event.detail === 1) {
        timer.current = setTimeout(onClick, 200)
        //setSelectedStore()
    } else if (event.detail === 2) {
        onDoubleClick()
        history.push(`store/${store._id}`)
    }
}
    return (
        <li
        className={`store d-inline-block `}
            onClick={onClickHandler}
        >
            <div className="d-inline-block">
                <img
                    alt="ok"
                    src={store.image}
                    className="img-fluid " />
            </div>
            <div className="d-inline-block px-3 top">
                <b className="thicker ">{store?.name}</b>
                <div className="store-infos ">
                    <span className="mdi mdi-star"></span>
                    
                        <b className="thicker ">
                        {store.rating}
                        </b>
                    
                    <span className="mdi mdi-cart-outline pl-2"></span>
                    <b>{store.category}</b>
                    <span className="mdi mdi-crosshairs-gps pl-2"></span>
                    <b>2,9km</b>
                </div>
                <span className="badge badge-primary">Frete Gratis</span>

            </div>

        </li>
    );
}

export default Store;