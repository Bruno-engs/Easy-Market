import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
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
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

////
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
      return { loading: false, stores: action.payload }
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
