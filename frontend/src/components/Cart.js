import React from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useDispatch } from 'react-redux'


const Cart = ({ product }) => {
  const dispatch = useDispatch()
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className=" col-12">
      <div
        className="row product-list-r">
        <div onClick={() => removeFromCartHandler(product.product)}

          className="col-3 my-auto">
          <img src={product.image} alt='' className="img-fluid" />
        </div>
        <div className="col-4">
          <b>{product.name} </b>
          <h5>
            <span className="badge bg-primary">R${product.price}</span>
          </h5>

        </div>
        <div className="col-4 text-end my-auto">
          <select
            className="form-select "
            aria-label="Default select example"
            value={product.qty}
            onChange={(e) =>
              dispatch(
                addToCart(product.product, Number(e.target.value))
              )
            }
          >
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>

        </div>

      </div>
    </div>
  );
};

export default Cart