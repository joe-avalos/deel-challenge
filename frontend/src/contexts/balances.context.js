import React, {createContext, useContext, useState} from "react";
import {AppContext} from "./app.context";
import {UsersContext} from "./users.context";
import {checkStatus} from "../util/checkStatus";

export const BalancesContext = createContext();

export const BalancesProvider = ({children}) => {
  const {API_BASE_ADDR, profile} = useContext(AppContext)
  const {fetchUsers} = useContext(UsersContext)
  const [depositResult, setDepositResult] = useState('')
  const [depositError, setDepositError] = useState('')
  
  const makeDeposit = (payment) => {
    return new Promise((resolve, reject) => {
      setDepositResult('')
      setDepositError('')
      fetch(`${API_BASE_ADDR}/balances/deposit/${profile.id}`, {
        headers: {
          profile_id: profile.id,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({payment})
      })
        .then(res => checkStatus(res))
        .then(data => {
          setDepositResult(data)
          fetchUsers()
          resolve()
        })
        .catch(err => {
          setDepositError(err.message)
          reject()
        })
    })
  }
  
  const value = {
    makeDeposit,
    depositError,
    depositResult
  };
  return <BalancesContext.Provider value={value}>{children}</BalancesContext.Provider>;
};

export default BalancesProvider;