import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import {
  //listProducts,
  deleteProduct,
  createProduct,
  listMyProducts,
  updateProductHidden,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_HIDDEN_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productsList = useSelector((state) => state.productsListMy)
  const { products } = productsList

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

  const productUpdateHidden = useSelector((state) => state.productUpdateHidden);
  const { success: successUpdateHidden } = productUpdateHidden;



  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listMyProducts('', pageNumber));
    }

    if (successUpdateHidden) {
      dispatch({ type: PRODUCT_UPDATE_HIDDEN_RESET });
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
    successUpdateHidden,
  ]);




  const deleteHandler = async (id) => {
    // Solicitar ao back-end para verificar se o produto tem pedidos pendentes
    const response = await fetch(`/api/products/${id}/orders`);
    const data = await response.json();

    let confirmationMessage;
    if (data.hasOrders) {
      if (data.hasDeliveredOrders) {
        confirmationMessage = 'Este produto tem pedidos pendentes. Se você continuar, o produto será marcado como invisível. Você tem certeza dessa ação?';
      } else {
        confirmationMessage = 'Este produto será excluído permanentemente. Você tem certeza dessa ação?';
      }
    } else {
      confirmationMessage = 'Este produto será excluído permanentemente. Você tem certeza dessa ação?';
    }

    if (window.confirm(confirmationMessage)) {
      dispatch(deleteProduct(id));
    }
  }



  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Produtos({products?.length})</h1>
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
              <th>OCULTO</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {products?.map((product) => (
              <tr key={product?._id}>
                <td>{product?._id}</td>
                <td>{product?.name}</td>
                <td>R${product?.price}</td>
                <td>{product?.category}</td>
                <td>{product?.brand}</td>
                <td>{product?.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
                <td>
                  {product.isHidden && (
                    <Button
                      variant='light'
                      className='hidden-btn'
                      onClick={() => {
                        if (window.confirm('Você tem certeza que deseja mostrar este produto?')) {
                          dispatch(updateProductHidden(product._id));
                        }
                      }}
                    >
                      <i className='fas fa-eye-slash'></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  )
}

export default ProductListScreen
