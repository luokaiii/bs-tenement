import React, { createContext, useReducer, useContext } from "react";

export const UserContext = createContext({});

export const STORE_CURRENT_USER = "STORE_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

const initialState = {
  user: {},
  isLogin: false,
  isAdmin: false,
  isSuperAdmin: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case STORE_CURRENT_USER:
      console.log("存储用户信息------", action.payload);
      return action.payload;
    case REMOVE_CURRENT_USER:
      console.log("移除用户登录信息-----");
      return initialState;
    default:
      return state;
  }
};

export const User = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
