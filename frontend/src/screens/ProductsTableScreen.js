import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listStoreDetails } from '../actions/storeActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Button, Table } from 'react-bootstrap'
//import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { STORE_CREATE_REVIEW_RESET } from '../constants/storeConstants'
import Meta from '../components/Meta'
import {
    //listProducts,
    deleteProduct,
    createProduct,
  } from '../actions/productActions'


const ProductsTableScreen = ({ match }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const storeDetails = useSelector((state) => state.storeDetails)
    const { store, loading, error } = storeDetails

    useEffect(() => {

        if (!store?._id || store?._id !== match.params?.id) {
            dispatch(listStoreDetails(match.params.id))
            dispatch({ type: STORE_CREATE_REVIEW_RESET })

        }
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
          }
      
          if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
          } else {
            //dispatch(listProducts('', pageNumber))
          }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        //pageNumber,
        match,  
        store?._id
      ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    return (

        <>
            <Meta title={store.name} />
            <div className="h-100">
                <Row className='align-items-center'>
                    <Col>
                    <h5>({store?.name}) Produtos Cadastrados : ({store?.products?.length})</h5>
                    </Col>
                    <Col className='text-right'>
                        <Button className='my-3' onClick={createProductHandler}>
                            <i className='fas fa-plus'></i> CRIAR PRODUTO
                        </Button>
                    </Col>
                </Row>
                {loadingDelete && <Loader />}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead className='text-center'>
                                <tr >
                                    <th>ID</th>
                                    <th>PRODUTOS</th>
                                    <th>PREÇO</th>
                                    <th>CATEGORIA</th>
                                    <th>MARCA</th>
                                    <th>QTD. ESTOQUE</th>
                                    <th>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {store?.products?.map((product) => (
                                    <tr key={product?._id}>
                                        <td>{product?._id}</td>
                                        <td>{product?.name}</td>
                                        <td>R${product?.price}</td>
                                        <td>{product?.category}</td>
                                        <td>{product?.brand}</td>
                                        <td>{product?.countInStock}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                                                <Button variant='light'
                                                    className='edt mr-4'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='light'
                                                className='trh'
                                                onClick={() => deleteHandler(product._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        
                    </>
                )}
            </div>
        </>
    );

}

export default ProductsTableScreen;