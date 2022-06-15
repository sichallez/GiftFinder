import axios from "axios";

/* Action Types */
const GET_ALLGIFTLIST = "GET_ALLGIFTLIST";

/* Action Creators */
const _getAllGiftlist = (giftlists) => {
  return {
    type: GET_ALLGIFTLIST,
    giftlists,
  };
};

/* Thunks */

export const getAllGiftlist = (userId) => {
  return async (dispatch) => {
    const allGroup = (
      await axios.get("/api/group", {
        headers: {
          authorization: window.localStorage.token,
        },
        params: {
          userId,
        },
      })
    ).data;

    const giftlists = (
      await axios.get("/api/giftlist", {
        headers: {
          authorization: window.localStorage.token,
        },
        params: {
          allGroup,
        },
      })
    ).data;

    dispatch(_getAllGiftlist(giftlists));
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
    case GET_ALLGIFTLIST:
      return action.giftlists;
    default:
      return state;
  }
}
