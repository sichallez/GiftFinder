import axios from "axios";

/* Action Types */
const GET_ALLGIFTLIST = "GET_ALLGIFTLIST";
const GET_ONEGIFTLIST = "GET_ONEGIFTLIST";

/* Action Creators */
const _getAllGiftlist = (giftlists) => {
  return {
    type: GET_ALLGIFTLIST,
    giftlists,
  };
};

const _getOneGiftlist = (giftlist) => {
  return {
    type: GET_ONEGIFTLIST,
    giftlist,
  };
};

/* Thunks */

// get all the giftlists by groups,
// return each group and all the giftlists shared within this group, for all groups that this user belongs to
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

export const getOneGiftlist = (wishlistId) => {
  return async (dispatch) => {
    const giftlist = (
      await axios.get(`/api/giftlist/${wishlistId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    dispatch(_getOneGiftlist(giftlist));
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
    console.log(gift)
      //return updated giftlist to state
      dispatch(_getGiftlist(giftlist));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  allGiftlist: [],
  oneGiftlist: {},
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALLGIFTLIST:
      return { ...state, allGiftlist: [...action.giftlists] };
    case GET_ONEGIFTLIST:
      return { ...state, oneGiftlist: { ...action.giftlist } };
    default:
      return state;
  }
}
