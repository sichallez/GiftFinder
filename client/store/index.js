import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import gifts from "./gifts";
import group from "./group";
import wishlist from "./wishlist";
import wishlists from "./wishlists";
import questions from "./questions";
import giftlist from "./giftlist";

const reducer = combineReducers({
  auth,
  gifts,
  group,
  wishlist,
  wishlists,
  questions,
  giftlist,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./gifts";
export * from "./wishlist";
export * from "./questions";
export * from "./group";
export * from "./giftlist";
