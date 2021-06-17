import React, {createContext, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const BASE_URL = process.env.REACT_APP_ENV_URL || 'localhost'
  const API_PORT = process.env.REACT_APP_API_PORT || '8080'
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const API_BASE_ADDR = `http://${BASE_URL}:${API_PORT}/${API_URL}`
  
  const [profile, setProfile] = useState(null)
  
  const value = {
    API_BASE_ADDR,
    setProfile,
    profile,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;