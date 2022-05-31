import axios from "axios";

/* Action Types */
const GET_WISHLIST = "GET_WISHLIST";

/* Action Creators */
const _getWishlist = (wishlist) => {
  return {
    type: GET_WISHLIST,
    wishlist,
  };
};

/* Thunks */

export const getWishlist = () => {
  return async (dispatch) => {
    const wishlist = (
      await axios.get("/api/wishlist/", {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    console.log(wishlist);

    dispatch(_getWishlist(wishlist));
  };
};

/* Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GET_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
}
