import types from './types'



export function setShopMapSelected(shop) {
	return { type: types.SET_STORE_MAP_SELECTED, shop};
}

export function setMapCenter(location) {
	return { type: types.SET_MAP_CENTER, location};
}

