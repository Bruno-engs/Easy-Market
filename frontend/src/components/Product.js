import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded product'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
    
      <Card.Body>
      <Card.Text as='h4'
        ><label className="badge badge-primary">R$ {product.price.toFixed(2)} </label></Card.Text>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} `}
          />
        </Card.Text>
        
      </Card.Body>
    </Card>
  )
}

export default Product
