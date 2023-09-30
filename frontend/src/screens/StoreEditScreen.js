
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listStoreDetails, updateStore } from '../actions/storeActions'
import { STORE_UPDATE_RESET } from '../constants/storeConstants'

const StoreEditScreen = ({ match, history }) => {
  const storeId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const storeDetails = useSelector((state) => state.storeDetails)
  const { loading, error, stores } = storeDetails

  const storeUpdate = useSelector((state) => state.storeUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = storeUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STORE_UPDATE_RESET })
      history.push('/admin/storelist')
    } else {
      if (!stores?.name || stores?._id !== storeId) {
        dispatch(listStoreDetails(storeId))
      } else {
        setName(stores?.name)
        setImage(stores?.image)
        setCategory(stores?.category)
      }
    }
  }, [dispatch, history, storeId, stores, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStore({
        _id: storeId,
        name,
        image,
        category,
      })
    )
  }

  return (
    <>
      <Link to='/admin/storelist' className='btn btn-primary my-3'>
        voltar
      </Link>
      <FormContainer>
        <h1>Editar loja</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Loja</Form.Label>
              <Form.Control
                type='name'
                placeholder='Insira o nome'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='imagem'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Inserir imagem'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Selecionar...'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>


            <Form.Group controlId='categoria'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Categoria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
              Atualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default StoreEditScreen
