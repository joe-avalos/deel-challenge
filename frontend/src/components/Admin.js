import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import AdminProvider from "../contexts/admin.context";
import BestClient from "./BestClient";
import BestProfession from "./BestProfession";

const Admin = () => {
  let {slug} = useParams()
  const isClient = slug === 'best-clients'
  
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [limit, setLimit] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    setIsSubmit(false)
  }, [slug])
  
  const handleSubmit = (e) => {
    setIsSubmit(false)
    setError('')
    e.preventDefault()
    if (Date.parse(start) && Date.parse(end)) {
      setIsSubmit(true)
    } else {
      setError('Please enter a valid date (2020-03-02)')
    }
  }
  
  return (
    <AdminProvider>
      <h1>Admin</h1>
      <p className="lead">{isClient ? 'Best Clients:' : 'Best Profession:'}</p>
      <form onSubmit={handleSubmit} className="container">
        <div className="row justify-content-center">
          <div className="col col-2">
            <label className="col-form-label">Start:</label>
          </div>
          <div className="col col-2">
            <input type="text" value={start} onChange={(e) => setStart(e.target.value)} placeholder="2019-07-04"/>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col col-2">
            <label className="col-form-label">End:</label>
          </div>
          <div className="col col-2">
            <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="2020-07-04"/>
          </div>
        </div>
        {isClient && <div className="row justify-content-center">
          <div className="col col-2">
            <label className="col-form-label">Limit results:</label>
          </div>
          <div className="col col-2">
            <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="3"/>
          </div>
        </div>}
        <div className="row justify-content-center">
          <button type="submit" className="btn btn-primary">Submit</button>
          {error !== '' && <p className="text-danger my-2">{error}</p>}
        </div>
      </form>
      {isClient && isSubmit && <BestClient start={start} end={end} limit={limit}/>}
      {!isClient && isSubmit && <BestProfession start={start} end={end}/>}
    </AdminProvider>
  );
};

export default Admin;