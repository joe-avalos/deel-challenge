import React, {createContext, useContext, useState} from "react";
import {AppContext} from "./app.context";
import {checkStatus} from "../util/checkStatus";

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
  const {API_BASE_ADDR} = useContext(AppContext)
  const [bestProfession, setBestProfession] = useState('')
  const [bestClient, setBestClient] = useState([])
  const [adminError, setAdminError] = useState('')
  
  const getBestProfession = (start, end) => {
    setAdminError('')
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_ADDR}/admin/best-profession?start=${start}&end=${end}`, {mode: 'cors',})
        .then(res => checkStatus(res))
        .then(data => {
          setBestProfession(data)
          resolve()
        })
        .catch(err => {
          setAdminError(err.message)
          reject()
        })
    })
  }
  
  const getBestClient = (start, end, limit = null) => {
    setAdminError('')
    limit = limit === '' ? null : limit
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_ADDR}/admin/best-clients?start=${start}&end=${end}${limit !== null ? '&limit=' + limit : ''}`, {mode: 'cors',})
        .then(res => checkStatus(res))
        .then(data => {
          setBestClient(data)
          resolve()
        })
        .catch(err => {
          setAdminError(err.message)
          reject()
        })
    })
  }
  
  const value = {
    getBestProfession,
    getBestClient,
    adminError,
    bestClient,
    bestProfession
  };
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminProvider;