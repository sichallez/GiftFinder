import axios from "axios";

/* Action Types */
const GET_ALL_WISHLIST = 'GET_ALL_WISHLIST';

/* Action Creators */

const _getAllWishlists = (wishlists) => {
  return {
    type: GET_ALL_WISHLIST,
    wishlists,
  };
};

/* Thunks */

export const getAllLists = () => {
  return async (dispatch) => {
    const wishlists = (
      await axios.get("/api/wishlist/", {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    dispatch(_getAllWishlists(wishlists));
  };
};

/* Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_WISHLIST:
      return action.wishlists;
    default:
      return state;
  }
}
