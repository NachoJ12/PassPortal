import { createContext, useState,ReactNode } from "react";


const initialValue = { isCollapsed: false };

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }:any) => {
  const [isCollapsed, setCollapse] = useState<boolean>(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };