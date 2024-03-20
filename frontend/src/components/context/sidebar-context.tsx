import React, { createContext, useReducer, } from "react";
interface Props {
  children: React.ReactNode;
}

const initialValue = { isCollapsed: false, toggleSidebarcollapse: () => {} };

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }:Props) => {

  const initialState = {
    ...initialValue,
    selectedItem: null,
  };

  const sidebarReducer = (state:any, action:any) => {
    switch (action.type) {
      case 'SELECT_ITEM':
        return { ...state, selectedItem: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={{ ...state,  dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };