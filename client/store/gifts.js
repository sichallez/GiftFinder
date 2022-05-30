import axios from "axios";
/* Action Types */
const SET_PRODUCTS = "SET_PRODUCTS";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
/* Action Creators */
const _fetchProducts = (gifts) => {
  return {
    type: SET_PRODUCTS,
    gifts,
  };
};
const _removeProducts = (flowerId) => {
  return {
    type: REMOVE_PRODUCT,
    flowerId,
  };
};
const _updateProducts = (flowerToUpdate) => {
  return {
    type: UPDATE_PRODUCT,
    flowerToUpdate,
  };
};
const _addProduct = (newFlower) => {
  return {
    type: ADD_PRODUCT,
    newFlower,
  };
};
/* Thunks */

export const fetchProducts = (query, minPrice, maxPrice) => {
  return async (dispatch) => {
    const gifts = (await axios.get("/api/gifts", { params: { q: query, minPrice: minPrice, maxPrice: maxPrice } })).data;
    console.log("STORE STORE STORE", gifts);
    dispatch(_fetchProducts(gifts));
  };
};
export const removeProducts = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_removeProducts(id));
    }
  };
};
export const updateProducts = (flower, history) => {
  return async (dispatch) => {
    const { data: flowerToUpdate } = await axios.put(
      `/api/products/${flower.id}`,
      flower
    );
    dispatch(_updateProducts(flowerToUpdate));
    history.push("/admin/products");
  };
};
export const createProducts = (_newFlower, history) => {
  return async (dispatch) => {
    const newFlower = (await axios.post("/api/products/", _newFlower)).data;
    dispatch(_addProduct(newFlower));
    history.push("/admin/products");
  };
};

/* Flower Reducer */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.gifts;
    case REMOVE_PRODUCT:
      return state.filter((flower) => flower.id !== action.flowerId);
    case UPDATE_PRODUCT:
      return state.map((flower) =>
        flower.id !== action.flowerToUpdate.id ? flower : action.flowerToUpdate
      );
    case ADD_PRODUCT:
      return [...state, action.newFlower];
    default:
      return state;
  }
}
