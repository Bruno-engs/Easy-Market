import React from 'react'
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MarkerIcon from '../assets/marker.png'
//import MarkerIconSelected from '../assets/marker-selected.png'



const Marker = ({ store }) => {
    

    return (
        <Link to={`/store/${store?._id}`}>
            <div >
                <img src={ MarkerIcon} 
                alt="ok" />
                <img src={store?.image} alt="mdi-cart-outline"
                    className="img-marker" />
            </div>
        </Link>
    );
}

export default Marker;