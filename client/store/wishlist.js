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

export const getWishlist = (id) => {
  return async (dispatch) => {
    const wishlist = (
      await axios.get(`/api/wishlist/${id}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    dispatch(_getWishlist(wishlist));
  };
};

export const changeSetting = (list) => {
  return async (dispatch) => {
    const wishlist = (
      await axios.put(`/api/wishlist/${list.id}`, {
        isShared: !list.isShared
      })
    ).data;

    dispatch(_getWishlist(wishlist));
  };
};

export const addToWishlist = (product,id) => {
  return async (dispatch) => {
    try{
      //get the wishlist id
      const wishlist = (
        await axios.get(`/api/wishlist/${id}`, {
          headers: {
            authorization: window.localStorage.token,
          },
        })
      ).data;

      //create the gift with the wishlist id
      const gift = (await axios.post("/api/gifts/",{
        url: product.url,
        name: product.title, 
        price: product.price, 
        rating: product.rating,
        description: product.description, 
        image_url: product.Images[0].url_fullxfull, 
        listingId: product.listing_id,
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

export const deleteFromWishlist = (gift,wishlistId) => {
  return async (dispatch) => {
    const removed = (
      await axios.delete(`/api/gifts/${gift.id}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    const wishlist = (
      await axios.get(`/api/wishlist/${wishlistId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;
    
    console.log(wishlist)
    dispatch(_getWishlist(wishlist));
  };
};

export const moveItem = (oldListId,newListId,giftId) => {
  return async (dispatch) => {
    (await axios.put(`/api/gifts/${giftId}`,{wishlistId: newListId}, {
      headers: {
        authorization: window.localStorage.token,
      },
    })
    ).data;

    const wishlist = (
      await axios.get(`/api/wishlist/${oldListId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;
    
    console.log(wishlist)
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
