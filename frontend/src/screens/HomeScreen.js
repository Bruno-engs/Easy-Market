import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { Row, Col } from 'react-bootstrap'
//import Product from '../components/Product'
//import Message from '../components/Message'
//import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { listStore } from '../actions/storeActions'
import SearchBox from '../components/SearchBox'
import { Route } from 'react-router-dom'
import Store from '../components/Store'
import Map from '../components/Map'



const HomeScreen = ({ match }) => {

  /**/
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {products} = productList
  //const { loading, error, products, page, pages } = productList
  const storeList = useSelector((state) => state.storeList)
  const { stores } = storeList
  useEffect(() => {
    dispatch(listStore(keyword, pageNumber));
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <h5 className='text-center'>Produtos cadastrados ({products?.length})</h5>
      <Route render={({ history }) => <SearchBox history={history} />} />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h5>Lojas em destaque:({stores?.length})</h5>
      <ul className="col-12 store-list">
        {stores?.map((p) => (
            <Store store={p} />
        ))}
      </ul>
      <Map stores={stores} />
    </>
  )
}

export default HomeScreen
/**/