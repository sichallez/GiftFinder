import axios from "axios";

/* Action Types */
const GET_ALLGROUPS = "GET_ALLGROUPS";
const CREATE_GROUP = "CREATE_GROUP";
const GET_ALLMEMBERS = "GET_ALLMEMBERS";

/* Action Creators */
const _getAllGroups = (groups) => {
  return {
    type: GET_ALLGROUPS,
    groups,
  };
};

const _createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

const _getAllMembers = (members) => {
  return {
    type: GET_ALLMEMBERS,
    members,
  };
};

/* Thunks */

export const getAllGroups = (userId) => {
  return async (dispatch) => {
    const groups = (
      await axios.get("/api/group", {
        headers: {
          authorization: window.localStorage.token,
        },
        params: {
          userId,
        },
      })
    ).data;

    dispatch(_getAllGroups(groups));
  };
};

export const createGroup = (newGroup, userId) => {
  return async (dispatch) => {
    const group = (
      await axios.post("/api/group", newGroup, {
        headers: {
          authorization: window.localStorage.token,
        },
        params: {
          userId,
        },
      })
    ).data;

    dispatch(_createGroup(group));
  };
};

export const getAllMembers = (groupRouteId) => {
  return async (dispatch) => {
    const members = (
      await axios.get(`/api/group/${groupRouteId}`, {
        headers: {
          authorization: window.localStorage.token,
        },
      })
    ).data;

    dispatch(_getAllMembers(members));
  };
};

export const inviteToGroup = (product) => {
  return async (dispatch) => {
    try {
      //get the group id
      let group = (
        await axios.get("/api/group/default", {
          headers: {
            authorization: window.localStorage.token,
          },
        })
      ).data;

      //create the gift with the group id
      const gift = (
        await axios.post("/api/gifts/", {
          name: product.title,
          price: product.price,
          description: product.description,
          image_url: product.Images[0].url_fullxfull,
          listingId: product.listing_id,
          url: product.url,
          groupId: group.id,
        })
      ).data;

      //return updated group to state
      dispatch(_getGroup(group));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  group: [],
  member: [],
}

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALLGROUPS:
      return {...state, group: action.groups};
    case CREATE_GROUP:
      return {...state, group: action.group};
    case GET_ALLMEMBERS:
      return {...state, member: action.members};
    default:
      return state;
  }
}
