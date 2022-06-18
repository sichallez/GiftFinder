import axios from "axios";
import history from "../history";

const TOKEN = "token";


/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_USER = 'UPDATE_USER'

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    // console.log("me", res.data);
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const updateUser = (user) => {
  return async dispatch => {
    const token = window.localStorage.getItem(TOKEN);
    if(token) {
      const updateUser = (await axios.put(`api/users/${user.id}`, uesr)).data
      dispatch(_updateUser(updateUser)) 
    }
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_USER: 
      return action.user
    default:
      return state;
  }
}