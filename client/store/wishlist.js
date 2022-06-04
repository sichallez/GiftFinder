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

    dispatch(_getWishlist(wishlist));
  };
};

export const addToWishlist = (product) => {
  return async (dispatch) => {
   //get the wishlist id
   const wishlist = (
      await axios.get("/api/wishlist/", {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

   //create the gift with the wishlist id
    console.log(product);
   const gift = (await axios.post("/api/gifts/",{
    name: product.title, 
    price: product.price, 
    description: product.description, 
    image_url: product.Images[0].url_fullxfull, 
    listingId: product.listingId,
    url: product.url,
    wishlistId: wishlist.id
   })).data;

   console.log(gift);
   //return updated wishlist to state

    console.log('adding in store');
    console.log(product);

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
