import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { requestStore } from '../store/modules/shop/actions'
import { listStoreDetails } from '../actions/storeActions'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import { STORE_CREATE_REVIEW_RESET } from '../constants/storeConstants'
import Meta from '../components/Meta'



const StoreScreen = ({ match }) => {
    const keyword = match.params.keyword
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const pageNumber = match.params.pageNumber || 1
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
    const { store, loading, error, products } = storeDetails
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
    return (

        <>
        <Meta title={store.name} />
        <div className="h-100">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src={store?.image} alt=''
                            className="img-fluid store-image" />
                        <b>{store?.name}</b>

                        <div className="store-infos">
                            <span className="mdi mdi-star"></span>
                            <text>
                                <b>
                                    {store?.rating}
                                </b>
                            </text>
                            <text>{store?.category}</text> <br />
                            <span className="mdi mdi-crosshairs-gps"></span>
                            <text>2,9km</text>
                        </div>
                        <span className="badge badge-primary">Frete Gratis</span><br /> <br />
                        
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
                                        <Col key={store?.products._id} sm={12} md={6} lg={4} xl={3}>
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