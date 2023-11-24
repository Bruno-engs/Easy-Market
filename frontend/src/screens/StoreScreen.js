import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { requestStore } from '../store/modules/shop/actions'
import { listStoreDetails, createStoreReview } from '../actions/storeActions'
//import { listProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import { STORE_CREATE_REVIEW_RESET } from '../constants/storeConstants'
import Meta from '../components/Meta'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'




const StoreScreen = ({ match }) => {
  //const keyword = match.params.keyword
  //const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  //const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch();
  /* const { store } = useSelector((state) => state.shop);

  useEffect(() => {
      dispatch(requestStore(match.params.id));
  }, [dispatch, match]);
  //const storeList = useSelector((state) => state.storeList)
  //const { stores } = storeList

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList*/

  const storeDetails = useSelector((state) => state.storeDetails)
  const { store, loading, error, /*products*/ } = storeDetails
  /*useEffect(() => {
      dispatch(listStoreDetails(match.params?.id))
      dispatch(listProducts(keyword, pageNumber));

  }, [dispatch, keyword, pageNumber, match])

  const abc = () => {
      console.log(store)

  }*/
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successStoreReview,
    loading: loadingStoreReview,
    error: errorStoreReview,
  } = productReviewCreate
  useEffect(() => {
    if (successStoreReview) {
      setRating(0)
      setComment('')
    }
    if (!store?._id || store?._id !== match.params?.id) {
      dispatch(listStoreDetails(match.params.id))
      dispatch({ type: STORE_CREATE_REVIEW_RESET })

    }
  }, [dispatch, match, successStoreReview, store?._id])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createStoreReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (

    <>
      <Meta title={store.name} />
      <div className="h-100">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src={store?.image} alt=''
                className="img-fluid store-image" />
              <b className="store-name">{store?.name}</b>
              <div className="store-infos">
                <i className="fa fa-star yellow-icon" aria-hidden="true"></i>
                <b className="rating mr-3">{store?.rating}</b>
                <b className="category">{store?.category}</b> <br />
                <i className="fa fa-star yellow-icon" aria-hidden="true"></i>
                <b className="distance">2,9km</b>
              </div>
              <span className="badge badge-primary">Frete Gratis</span><br /> <br />
              <h5>Avaliações: </h5>
              {store.reviews.length === 0 && <Message>Sem Avaliações</Message>}
              <ListGroup variant='flush'>
                {store.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <b>Avalie nossa loja:</b>
                  {successStoreReview && (
                    <Message variant='success'>
                      Avaliação enviada com sucesso
                    </Message>
                  )}
                  {loadingStoreReview && <Loader />}
                  {errorStoreReview && (
                    <Message variant='danger'>{errorStoreReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Avaliação</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Avaliar...</option>
                          <option value='1'>1 - Ruim</option>
                          <option value='2'>2 - Mediano</option>
                          <option value='3'>3 - Bom</option>
                          <option value='4'>4 - Muito Bom</option>
                          <option value='5'>5 - Excelente</option>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingStoreReview}
                        type='submit'
                        variant='primary'
                      >
                        Enviar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Porfavor faça o <Link to='/login'>login</Link> para avaliar o produto{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div className="col-10">
              <h5>Produtos : ({store?.products?.length})</h5>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <>
                  <Row>
                    {store?.products?.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );

}

export default StoreScreen;