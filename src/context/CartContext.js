import React, { useReducer } from "react";
import { ADD_TO_CART } from "./types";

const initialState = {
  carts: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.carts.length === 0) {
        return { ...state, carts: [{ ...action.payload, quantity: 1 }] };
      } else {
        const index = state.carts.findIndex(
          (cart) => cart.id === action.payload.id
        );

        if (index !== -1) {
          const data = state.carts.map((cart) =>
            cart.id === action.payload.id
              ? { ...cart, quantity: cart.quantity + 1 }
              : cart
          );
          return { ...state, carts: data };
        }
        return {
          ...state,
          carts: [...state.carts, ...[{ ...action.payload, quantity: 1 }]],
        };
      }
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (food) => {
    dispatch({ type: ADD_TO_CART, payload: food });
  };

  const removeFromCart = () => {};

  const actions = { addToCart, removeFromCart };

  const value = { state, ...actions };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
