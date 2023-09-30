/**/import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { requestStore } from '../store/modules/shop/actions'
import { listStoreDetails } from '../actions/storeActions'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'



const SearchScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch();
    /* const { store } = useSelector((state) => state.shop);

    useEffect(() => {
        dispatch(requestStore(match.params.id));
    }, [dispatch, match]);
    
    
    
    
    
                            <img src={stores?.image} alt=''
                            className="img-fluid store-image" />
                        <b>{stores?.name}</b>

                        <div className="store-infos">
                            <span className="mdi mdi-star"></span>
                            <text>
                                <b>
                                    {stores?.rating}
                                </b>
                            </text>
                            <text>{stores?.category}</text> <br />
                            <span className="mdi mdi-crosshairs-gps"></span>
                            <text>2,9km</text>
                        </div>
                        <span className="badge badge-primary">Frete Gratis</span><br />
                        <span className="badge badge-primary"><b>Produtos: </b></span>
    
    
    
    
    */
    //const storeList = useSelector((state) => state.storeList)
    //const { stores } = storeList

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const storeDetails = useSelector((state) => state.storeDetails)
    const { stores } = storeDetails
    useEffect(() => {
        dispatch(listStoreDetails(match.params?.id))
        dispatch(listProducts(keyword, pageNumber));

    }, [dispatch, keyword, pageNumber, match])

    console.log(stores)
    return (
        <div className="h-100">
            <div className="container">
                <div className="row">
                    <div className="col-2">


                    </div>
                    <div className="col-10">
                        <h5>Produtos :</h5>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <>
                                <Row>
                                    {products.map((product) => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate
                                    pages={pages}
                                    page={page}
                                    keyword={keyword ? keyword : ''}
                                />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>

    );

}

export default SearchScreen;