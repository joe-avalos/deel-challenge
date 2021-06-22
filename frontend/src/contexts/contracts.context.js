import React, {
  createContext, useCallback,
  useContext,
  useState,
} from "react"
import {AppContext} from "./app.context";
import {checkStatus} from "../util/checkStatus";


export const ContractsContext = createContext();

export const ContractsProvider = ({children}) => {
  const {API_BASE_ADDR, profile} = useContext(AppContext)
  const [contracts, setContracts] = useState([])
  const [selected, setSelected] = useState(null)
  
  const fetchContracts = useCallback(() => {
    fetch(`${API_BASE_ADDR}/contracts`, {
      headers: {
        profile_id: profile.id
      },
      mode: 'cors'
    })
      .then(res => checkStatus(res))
      .then(data => setContracts(data))
      .catch(e => console.error(e.message))
  },[API_BASE_ADDR, profile.id])
  
  const fetchContract = (id) => {
    fetch(`${API_BASE_ADDR}/contracts/${id}`, {
      headers: {
        profile_id: profile.id
      },
      mode: 'cors'
    })
      .then(res => checkStatus(res))
      .then(data => setSelected(data))
      .catch(e => console.error(e.message))
  }
  
  const value = {
    fetchContracts,
    contracts,
    fetchContract,
    selected,
  };
  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>;
};

export default ContractsProvider;
