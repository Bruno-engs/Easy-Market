import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/products/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='mb-2 '>
      <div className="col-12 ">
        <div className="input-group">
          <Button type='submit' variant='outline-dark' className='btn btn-dark p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" className="bi bi-search" viewBox="0 0 16 18">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </Button>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Procurar produto...'
            className='mr-sm-2 ml-2 w-auto p-3'
          ></Form.Control>
        </div>
      </div>
    </Form>
  )
}

export default SearchBox
