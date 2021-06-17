import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import {AppContext} from "./app.context";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const {API_BASE_ADDR} = useContext(AppContext)
  const [users, setUsers] = useState([])
  
  const fetchUsers = () => {
    fetch(`${API_BASE_ADDR}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }
  
  useEffect(()=>{
    fetchUsers()
  },[])
  
  const value = {
    users,
    fetchUsers,
  };
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
