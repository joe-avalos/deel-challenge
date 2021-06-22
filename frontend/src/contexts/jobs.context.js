import React, {
  createContext, useCallback,
  useContext,
  useState
} from "react"
import {AppContext} from "./app.context";
import {UsersContext} from "./users.context";
import {checkStatus} from "../util/checkStatus";

export const JobsContext = createContext();

export const JobsProvider = ({children}) => {
  const {API_BASE_ADDR, profile} = useContext(AppContext)
  const {fetchUsers} = useContext(UsersContext)
  const [jobs, setJobs] = useState([])
  const [paymentResult, setPaymentResult] = useState('')
  const [paymentError, setPaymentError] = useState('')
  
  const fetchJobs = useCallback(() => {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_ADDR}/jobs/unpaid`, {
        headers: {
          profile_id: profile.id
        },
        mode: 'cors'
      })
        .then(res => checkStatus(res))
        .then(data => {
          setJobs(data)
          resolve()
        })
        .catch(err => reject(err))
    })
  },[profile.id, API_BASE_ADDR])
  
  const makePayment = (id, payment) => {
    setPaymentError('')
    setPaymentResult('')
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_ADDR}/jobs/${id}/pay`, {
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
          setPaymentResult(data)
          fetchUsers()
          resolve()
        })
        .catch(err => {
          setPaymentError(err.message)
          reject()
        })
    })
  }
  
  const value = {
    fetchJobs,
    makePayment,
    paymentResult,
    paymentError,
    jobs
  };
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsProvider;
