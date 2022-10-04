import React, { useReducer } from "react";
import foodApi from "../api/food";

const initialState = {
  carts: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  addToCart = () => {};

  removeFromCart = () => {};

  const actions = { addToCart, removeFromCart };

  const value = { state, ...actions };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
