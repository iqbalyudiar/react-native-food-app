import React, { useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "./types";

const initialState = {
  carts: [],
  restaurant: "",
};

const cartReducer = (state, action) => {
  const found = state.carts.some(
    (cart) => cart.id === action?.payload?.food?.id
  );
  switch (action.type) {
    case ADD_TO_CART:
      if (found) {
        const data = state.carts.map((cart) =>
          cart.id === action.payload.food.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
        return { ...state, carts: data };
      }

      return {
        ...state,
        carts: [...state.carts, ...[{ ...action.payload.food, quantity: 1 }]],
        restaurant: action.payload.restaurant,
      };
    case REMOVE_FROM_CART:
      if (found) {
        const newCarts = state.carts
          .map((cart) =>
            cart.id === action.payload.food.id && cart.quantity > 0
              ? { ...cart, quantity: cart.quantity - 1 }
              : cart
          )
          .filter((item) => item.quantity > 0);

        const newRestaurant = newCarts.length === 0 ? "" : state.restaurant;

        return { ...state, carts: newCarts, restaurant: newRestaurant };
      }

      return { ...state };
    case RESET_CART:
      return { ...state, carts: [], restaurant: "" };

    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (food, restaurant) => {
    dispatch({ type: ADD_TO_CART, payload: { food, restaurant } });
  };

  const removeFromCart = (id) => {
    const food = { id };
    dispatch({ type: REMOVE_FROM_CART, payload: { food } });
  };

  const resetCart = () => {
    dispatch({ type: RESET_CART });
  };

  const actions = { addToCart, removeFromCart, resetCart };

  const value = { state, ...actions };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
