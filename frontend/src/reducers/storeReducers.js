import {
  STORES_LIST_MY_REQUEST,
  STORES_LIST_MY_SUCCESS,
  STORES_LIST_MY_FAIL,
  STORES_LIST_MY_RESET,
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
  STORE_CREATE_RESET,
  STORE_CREATE_FAIL,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_REQUEST,
  STORE_UPDATE_REQUEST,
  STORE_UPDATE_SUCCESS,
  STORE_UPDATE_FAIL,
  STORE_UPDATE_RESET,
  STORE_CREATE_REVIEW_REQUEST,
  STORE_CREATE_REVIEW_SUCCESS,
  STORE_CREATE_REVIEW_FAIL,
  STORE_CREATE_REVIEW_RESET,
  STORE_TOP_REQUEST,
  STORE_TOP_SUCCESS,
  STORE_TOP_FAIL,
} from '../constants/storeConstants'

/////
export const storesListMyReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case STORES_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case STORES_LIST_MY_SUCCESS:
      return {
        loading: false,
        stores: action.payload,
      }
    case STORES_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case STORES_LIST_MY_RESET:
      return { stores: [] }
    default:
      return state
  }
}

////
export const storesReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case STORES_REQUEST:
      return { loading: true, stores: [] }
    case STORES_SUCCESS:
      return {
        loading: false,
        stores: action.payload.stores,
      }
    case STORES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


////
export const storeListReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case STORE_LIST_REQUEST:
      return { loading: true, stores: [] }
    case STORE_LIST_SUCCESS:
      return {
        loading: false,
        stores: action.payload.stores,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case STORE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const storeDetailsReducer = (
  state = { store: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case STORE_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STORE_DETAILS_SUCCESS:
      return { loading: false, store: action.payload }
    case STORE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const storeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_DELETE_REQUEST:
      return { loading: true }
    case STORE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case STORE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const storeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_CREATE_REQUEST:
      return { loading: true }
    case STORE_CREATE_SUCCESS:
      return { loading: false, success: true, stores: action.payload }
    case STORE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STORE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const storeUpdateReducer = (state = { store: {} }, action) => {
  switch (action.type) {
    case STORE_UPDATE_REQUEST:
      return { loading: true }
    case STORE_UPDATE_SUCCESS:
      return { loading: false, success: true, store: action.payload }
    case STORE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STORE_UPDATE_RESET:
      return { store: {} }
    default:
      return state
  }
}

export const storeReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case STORE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case STORE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case STORE_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const storeTopRatedReducer = (state = { store: [] }, action) => {
  switch (action.type) {
    case STORE_TOP_REQUEST:
      return { loading: true, store: [] }
    case STORE_TOP_SUCCESS:
      return { loading: false, store: action.payload }
    case STORE_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
