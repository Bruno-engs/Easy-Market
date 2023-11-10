
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
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const storeDetails = useSelector((state) => state.storeDetails)
  const { loading, error, store } = storeDetails

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
      if (!store?.name || store?._id !== storeId) {
        dispatch(listStoreDetails(storeId))
      } else {
        setName(store?.name)
        setImage(store?.image)
        setLat(store?.location.lat)
        setLng(store?.location.lng)
        setCategory(store?.category)
      }
    }
  }, [dispatch, history, storeId, store, successUpdate])

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
        location:{lat,lng},
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
            <Form.Group controlId='lat'>
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type='number'
                placeholder='Insira a latitude'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              ></Form.Control>
            </Form.Group>            
            <Form.Group controlId='lng'>
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type='number'
                placeholder='Insira a longitude'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              ></Form.Control>
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
