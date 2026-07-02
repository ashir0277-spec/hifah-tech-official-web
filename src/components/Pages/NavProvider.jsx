import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export function NavProvider({ children }) {
  const [showNav, setShowNav] = useState(true);
  return (
    <NavContext.Provider value={{ showNav, setShowNav }}>
      {children}
    </NavContext.Provider>
  );
}

// export const useNav = () => useContext(NavContext);
export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used inside <NavProvider>");
  }
  return context;
};