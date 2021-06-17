import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import {AppContext} from "./app.context";
import {checkStatus} from "../util/checkStatus";

export const UsersContext = createContext();

export const UsersProvider = ({children}) => {
  const {API_BASE_ADDR} = useContext(AppContext)
  const [users, setUsers] = useState([])
  
  const fetchUsers = () => {
    fetch(`${API_BASE_ADDR}/users`)
      .then(res => checkStatus(res))
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])
  
  const value = {
    users,
    fetchUsers,
  };
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
