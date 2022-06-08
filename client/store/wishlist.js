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

export const getWishlist = (listId) => {
  return async (dispatch) => {
    const wishlist = (
      await axios.get(`/api/wishlist/${listId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    dispatch(_getWishlist(wishlist));
  };
};

export const addToWishlist = (product) => {
  return async (dispatch) => {
    try{
      //get the wishlist id
      let wishlist = (
        await axios.get("/api/wishlist/", {
          headers: {
            authorization: window.localStorage.token,
          },
        })
      ).data;

      console.log(product)
      //create the gift with the wishlist id
      const gift = (await axios.post("/api/gifts/",{
        name: product.title, 
        price: product.price, 
        description: product.description, 
        image_url: product.Images[0].url_fullxfull, 
        listingId: product.listing_id,
        url: product.url,
        wishlistId: wishlist.id
      })).data;

      //return updated wishlist to state
      dispatch(_getWishlist(wishlist));
    }
    catch(err){
      console.log(err)
    }
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
