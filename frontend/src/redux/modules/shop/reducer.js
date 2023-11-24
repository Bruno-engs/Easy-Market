import produce from 'immer';
import types from './types';

const INITIAL_STATE ={
  shopMapSelected: null,
  mapCenter:{
    lat: -15.819391380128794,
    lng: -48.082514775944325,  
  },
}

function shop(state = INITIAL_STATE, action) {
	switch (action.type) {


      case types.SET_STORE_MAP_SELECTED:{
        return produce(state, (draft) => {
          draft.shopMapSelected = action.shop;
        });
      }

      case types.SET_MAP_CENTER:{
        return produce(state, (draft) => {
          draft.mapCenter= action.location;
        });
      }

      default:
        return state;
    }}

export default shop;