import React, { useReducer } from "react";
import foodApi from "../api/food";
import { GET_ORDERS } from "./types";

const initialState = {
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addOrder = async ({ carts, restaurant, totalPrice }, callback) => {
    try {
      const params = {
        id: Math.floor(Math.random() * 99999),
        created_at: Date.now(),
        items: carts,
        restaurant,
        totalPrice,
        status: 'inprogress'
      };

      await foodApi.post("/orders", params);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getOrders = async () => {
    try {
      const response = await foodApi.get("/orders");
      dispatch({ type: GET_ORDERS, payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  };

  const actions = { addOrder, getOrders };

  const value = { state, ...actions };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
