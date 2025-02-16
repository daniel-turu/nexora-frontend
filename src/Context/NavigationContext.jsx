import { createContext, useContext, useState, useEffect } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentParams, setCurrentParams] = useState(null);
  const [history, setHistory] = useState([]);

  // Function to parse hash and update state
  const updateStateFromHash = () => {
    const hash = window.location.hash.slice(1); // Remove "#"
    if (!hash) return;

    const [page, paramString] = hash.split("?"); // Split page & params
    const params = Object.fromEntries(new URLSearchParams(paramString));

    setCurrentPage(page || "Home");
    setCurrentParams(params);
  };

  // Sync state with URL on mount
  useEffect(() => {
    updateStateFromHash();
    window.addEventListener("hashchange", updateStateFromHash);
    return () => window.removeEventListener("hashchange", updateStateFromHash);
  }, []);

  // Navigate function updates URL
  const navigate = (page, params = null) => {
    setHistory(prev => [...prev, { page: currentPage, params: currentParams }]);
    
    const paramString = params ? `?${new URLSearchParams(params).toString()}` : "";
    window.location.hash = `${page}${paramString}`;

    setCurrentPage(page);
    setCurrentParams(params);
  };

  const goBack = () => {
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      navigate(lastEntry.page, lastEntry.params);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, currentParams, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
