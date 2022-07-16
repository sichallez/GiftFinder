import axios from "axios";
/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_GIFT = 'CREATE_GIFT'

/* Action Creators */

const _fetchProducts = (gifts) => {
  return {
    type: SET_PRODUCTS,
    gifts,
  };
};

const _createGift = (gift) => {
  return {
    type: CREATE_GIFT,
    gift
  }
}

/* Thunks */

export const fetchProducts = (query, minPrice, maxPrice) => {
  return async (dispatch) => {
    const gifts = (
      await axios.get("/api/gifts", {
        params: { q: query, minPrice: minPrice, maxPrice: maxPrice },
      })
    ).data;
    dispatch(_fetchProducts(gifts));
  };
};

export const createGift = (gift, wishlistId) => {
  return async dispatch => {
     const wishlist = (
      await axios.get(`/api/wishlist/${wishlistId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;
    const gifts = await axios.get('/api/gifts',)
    const gift = (await axios.post('/api/gifts', {wishlistId: wishlist.id})).data

    dispatch(_createGift(gift))
    dispatch(_fetchProducts(gifts));
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.gifts;
    case CREATE_GIFT:
      return [...state, action.gift]
    default:
      return state;
  }
}