import axios from 'axios'
import {
  STORES_LIST_MY_REQUEST,
  STORES_LIST_MY_SUCCESS,
  STORES_LIST_MY_FAIL,
  STORES_REQUEST,
  STORES_SUCCESS,
  STORES_FAIL,
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_DETAILS_FAIL,
  STORE_DELETE_REQUEST,
  STORE_DELETE_SUCCESS,
  STORE_DELETE_FAIL,
  STORE_CREATE_FAIL,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_REQUEST,
  STORE_UPDATE_REQUEST,
  STORE_UPDATE_SUCCESS,
  STORE_UPDATE_FAIL,
  STORE_CREATE_REVIEW_REQUEST,
  STORE_CREATE_REVIEW_SUCCESS,
  STORE_CREATE_REVIEW_FAIL,
  STORE_TOP_REQUEST,
  STORE_TOP_SUCCESS,
  STORE_TOP_FAIL,
} from '../constants/storeConstants'
import { logout } from './userActions'

//////Stores abaixo sem paginação

export const storesAll = () => async (
  dispatch
) => {
  try {
    dispatch({ type: STORES_REQUEST })

    const { data } = await axios.get(
      `/stores`
    )

    dispatch({
      type: STORES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STORES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
/////

/////
export const listMyStores = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORES_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/store/mystores`, config)

    dispatch({
      type: STORES_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORES_LIST_MY_FAIL,
      payload: message,
    })
  }
}

////// requests stores
export const listStore = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/store?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listStoreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STORE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/store/${id}`)

    dispatch({
      type: STORE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STORE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteStore = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/store/${id}`, config)

    dispatch({
      type: STORE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createStore = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/store`, {}, config)

    dispatch({
      type: STORE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateStore = (store) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/store/${store._id}`,
      store,
      config
    )

    dispatch({
      type: STORE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: STORE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createStoreReview = (storeId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STORE_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/store/${storeId}/reviews`, review, config)

    dispatch({
      type: STORE_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopStore = () => async (dispatch) => {
  try {
    dispatch({ type: STORE_TOP_REQUEST })

    const { data } = await axios.get(`/api/store/top`)

    dispatch({
      type: STORE_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STORE_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}