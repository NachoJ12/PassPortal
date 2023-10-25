import React, { createContext, useState, useReducer, ReactNode } from "react";
interface Props {
  children: React.ReactNode;
}

const initialValue = { isCollapsed: false, toggleSidebarcollapse: () => {} };

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }:Props) => {

  const [isCollapsed, setCollapse] = useState(false);


  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

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
    <SidebarContext.Provider value={{ ...state, isCollapsed, toggleSidebarcollapse, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };