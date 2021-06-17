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
  
  return (<>
      {paymentResult !== '' && <p className="text-success">{paymentResult}</p>}
      <table className="table">
        <thead>
        <tr>
          <th scope="col">ID#</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {jobs.length > 0 &&
        jobs.map((job) => <tr key={job.id}>
          <td>{job.id}</td>
          <td>{job.description}</td>
          <td>{job.price}</td>
          {!jobForm[job.id] && <td>
            <button
              className="btn btn-primary"
              onClick={() => setJobForm((prev) => {
                return {...prev, [job.id]: true}
              })}>
              Make Payment
            </button>
          </td>}
          {jobForm[job.id] && <td>
            <form onSubmit={(e) => handlePayment(e, job.id)}
                  className="container"
            >
              <div className="row no-gutters justify-content-center">
                <div className="col col-3">
                  <input type="text"
                         className="form-control"
                         placeholder="Payment Amount"
                         value={payment[job.id]}
                         onChange={(e) => {
                           setPayment(prev => {
                             return {...prev, [job.id]: e.target.value}
                           })
                         }}/>
                </div>
                <div className="col col-3">
                  <button className="btn btn-primary" type="submit">Submit Payment</button>
                </div>
              </div>
              <div className="row justify-content-center">
                {error !== '' && <p className="text-danger">{error}</p>}
                {paymentError !== '' && <p className="text-danger">{paymentError}</p>}
              </div>
            </form>
          </td>}
        </tr>)
        }
        </tbody>
      </table>
    </>
  );
}


export default JobsList;