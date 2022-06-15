import axios from "axios";

/* Action Types */
const GET_GIFTLIST = "GET_GIFTLIST";

/* Action Creators */
const _getGiftlist = (giftlist) => {
  return {
    type: GET_GIFTLIST,
    giftlist,
  };
};

/* Thunks */

export const getAllGiftlist = (allGroup) => {
  return async (dispatch) => {
    const giftlist = (
      await axios.get("/api/giftlist", {
        headers: {
          authorization: window.localStorage.token,
        },
        params: {
          allGroup,
        },
      })
    ).data;

    dispatch(_getGiftlist(giftlist));
  };
};

export const addToGiftlist = (product, id) => {
  return async (dispatch) => {
    try {
      //get the giftlist id
      const giftlist = (
        await axios.get(`/api/giftlist/${id}`, {
          headers: {
            authorization: window.localStorage.token,
          },
        })
      ).data;

      //create the gift with the giftlist id
      const gift = (
        await axios.post("/api/gifts/", {
          name: product.title,
          price: product.price,
          description: product.description,
          image_url: product.Images[0].url_fullxfull,
          listingId: product.listing_id,
          url: product.url,
          giftlistId: giftlist.id,
        })
      ).data;

      //return updated giftlist to state
      dispatch(_getGiftlist(giftlist));
    } catch (err) {
      console.log(err);
    }
  };
};

/* Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case GET_GIFTLIST:
      return action.giftlist;
    default:
      return state;
  }
}
