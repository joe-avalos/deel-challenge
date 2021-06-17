import React, {useContext, useEffect, useState} from 'react';
import {JobsContext} from "../contexts/jobs.context";
import {AppContext} from "../contexts/app.context";

const JobsList = () => {
  const {jobs, fetchJobs, makePayment, paymentResult, paymentError} = useContext(JobsContext)
  const {profile} = useContext(AppContext)
  const [jobForm, setJobForm] = useState({})
  const [payment, setPayment] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchJobs()
  }, [])
  
  useEffect(() => {
    setJobForm(jobs.reduce((acc, job) => {
      acc[job.id] = false
      return acc
    }, {}))
    setPayment(jobs.reduce((acc, job) => {
      acc[job.id] = ''
      return acc
    }, {}))
    setLoading(false)
  }, [jobs])
  
  const handlePayment = async (e, id) => {
    e.preventDefault()
    setError('')
    const job = jobs.filter((item) => item.id === id)[0]
    const amount = parseFloat(payment[id])
    if (amount >= 0 && profile.balance >= amount && job.price === amount) {
      makePayment(id, payment[id]).then(() => {
        setJobForm((prev) => {
          return {...prev, [id]: false}
        })
        setPayment((prev) => {
          return {...prev, [id]: ''}
        })
        fetchJobs()
      })
    } else {
      if (amount < 0 || job.price !== amount) {
        setError('Please pay an amount equal to the total price.')
        return;
      }
      if (profile.balance < amount) {
        setError('You don\'t have enough funds.');
      }
    }
  }
  if (loading) return <h3>Loading...</h3>
  
  return (
    <div>
      {jobs.length > 0 &&
      jobs.map((job) => <div key={job.id}>
        <p>ID: {job.id}</p>
        <p>Description: {job.description}</p>
        <p>Price: {job.price}</p>
        {!jobForm[job.id] &&
        <button onClick={() => setJobForm((prev) => {
          return {...prev, [job.id]: true}
        })}>
          Make Payment
        </button>}
        {jobForm[job.id] &&
        <form onSubmit={(e) => {
          handlePayment(e, job.id)
        }}>
          <input type="text"
                 value={payment[job.id]}
                 onChange={(e) => {
                   setPayment(prev => {
                     return {...prev, [job.id]: e.target.value}
                   })
                 }}/>
          {error !== '' && <p>{error}</p>}
          <button type="submit">Submit Payment</button>
        </form>}
        {paymentError !== '' && <p>{paymentError}</p>}
      </div>)
      }
      {paymentResult !== '' && <p>{paymentResult}</p>}
    </div>
  );
}


export default JobsList;