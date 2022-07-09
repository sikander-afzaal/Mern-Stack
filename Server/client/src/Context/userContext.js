import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./userReducer";
export const UserContextCreate = createContext();

function UserContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContextCreate.Provider value={{ state, dispatch }}>
      {children}
    </UserContextCreate.Provider>
  );
}

export default UserContext;
