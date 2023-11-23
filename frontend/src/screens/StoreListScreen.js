import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import {
  deleteStore,
  createStore,
  listMyStores,
  updateStoreHidden,
} from '../actions/storeActions'
import { STORE_CREATE_RESET, STORE_UPDATE_HIDDEN_RESET } from '../constants/storeConstants'
//import Paginate2 from '../components/Paginate2'

const StoreListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  
  const storeList = useSelector((state) => state.storesListMy)
  const {  stores } = storeList

  //const storeList = useSelector((state) => state.storeList)
  //const { loading, error, stores, page, pages } = storeList

  const storeDelete = useSelector((state) => state.storeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = storeDelete

  const storeCreate = useSelector((state) => state.storeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    store: createdStore,
  } = storeCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const storeUpdateHidden = useSelector((state) => state.storeUpdateHidden);
  const { success: successUpdateHidden } = storeUpdateHidden;

  useEffect(() => {
    dispatch({ type: STORE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      //history.push(`/admin/store/${createdStore?._id}/edit`)
    } else {
      dispatch(listMyStores('', pageNumber))
      //dispatch(listStore('', pageNumber))
    }
    if (successUpdateHidden) {
      dispatch({ type: STORE_UPDATE_HIDDEN_RESET });
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdateHidden,
    createdStore,
    pageNumber,
  ])

  const deleteHandler = async (id) => {
    // Solicitar ao back-end para verificar se a loja tem produtos com pedidos pendentes
    const response = await fetch(`/api/store/${id}/products/orders`);
    const data = await response.json();
  
    let confirmationMessage;
    if (data.hasProducts) {
      if (data.hasPendingOrders) {
        confirmationMessage = 'Esta loja tem produtos com pedidos pendentes. Se você continuar, todos os produtos serão marcados como invisíveis. Você tem certeza dessa ação?';
      } else {
        confirmationMessage = 'Esta loja e todos os seus produtos serão excluídos permanentemente. Você tem certeza dessa ação?';
      }
    } else {
      confirmationMessage = 'Esta loja será excluída permanentemente. Você tem certeza dessa ação?';
    }
  
    if (window.confirm(confirmationMessage)) {
      dispatch(deleteStore(id));
    }
  }
  
  const isVisible = (id) => {
    if (window.confirm('Você tem certeza que deseja alterar a visibilidade desta loja?')) {
      dispatch(updateStoreHidden(id));
    }
  };

  const createStoreHandler = () => {

    dispatch(createStore())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Lojas({stores?.length})</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createStoreHandler}>
            <i className='fas fa-plus'></i> Criar Loja
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
              <tr>
                <th>ID</th>
                <th>LOJA</th>
                <th>CATEGORIA</th>
                <th>AÇÕES</th>
                <th>OCULTO</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {stores?.map((stores) => (
                <tr key={stores?._id}>
                  <td
                  onClick={() => history.push(`/admin/store/${stores._id}`)}
                  >{stores?._id}</td>
                  <td>{stores?.name}</td>
                  <td>{stores?.category}</td>
                  <td>
                    <LinkContainer to={`/admin/store/${stores._id}/edit`}>
                      <Button variant='light' className='edt mr-4'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='light'
                      className='trh'
                      onClick={() => deleteHandler(stores?._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                  <td>
                  {stores.isHidden && (
                    <Button variant='light' className='hidden-btn' onClick={() => isVisible(stores._id)}>
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

export default StoreListScreen
