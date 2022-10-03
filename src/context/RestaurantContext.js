import React, { useReducer } from "react";
import foodApi from "../api/food";
import { GET_RESTAURANTS } from "./types";

const initialState = {
  restaurants: [],
};

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return { ...state, restaurants: action.payload };
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  const getRestaurants = async () => {
    try {
      const response = await foodApi.get("/restaurants");
      dispatch({ type: GET_RESTAURANTS, payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  };

  const actions = { getRestaurants };

  const value = { state, ...actions };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
