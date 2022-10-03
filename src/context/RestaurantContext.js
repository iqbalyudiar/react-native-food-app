import React, { useReducer } from "react";

const initialState = {
  restaurant: [],
};

const restaurantReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  const getRestaurants = () => {};

  const value = { state, getRestaurants };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
