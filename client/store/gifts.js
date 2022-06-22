import axios from "axios";
/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";

/* Action Creators */

const _fetchProducts = (gifts) => {
  return {
    type: SET_PRODUCTS,
    gifts,
  };
};

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
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.gifts;
    default:
      return state;
  }
}