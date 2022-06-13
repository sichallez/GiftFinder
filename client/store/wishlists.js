import axios from "axios";

/* Action Types */
const GET_ALL_WISHLIST = "GET_ALL_WISHLIST";
const CREATE_WISHLIST = "CREATE_WISHLIST";

/* Action Creators */

const _getAllWishlists = (wishlists) => {
  return {
    type: GET_ALL_WISHLIST,
    wishlists,
  };
};

const _createWishlist = (wishlist) => {
  return {
    type: CREATE_WISHLIST,
    wishlist,
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

export const createWishlist = (wishlist, sharedGroups = []) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if(token) {
      const created = (await axios.post('/api/wishlist', wishlist, {
        params: {
          sharedGroups,
        },})).data
      const wishlists = (
      await axios.get("/api/wishlist/", {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;
      dispatch(_getAllWishlists(wishlists));
      dispatch(_createWishlist, created)
    }
  };
};

/* Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_WISHLIST:
      return action.wishlists;
    case CREATE_WISHLIST:
      return [...state, action.wishlist];
    default:
      return state;
  }
}
