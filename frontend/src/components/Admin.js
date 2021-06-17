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
  
  useEffect(()=>{
    setIsSubmit(false)
  },[slug])
  
  const handleSubmit = (e)=>{
    setIsSubmit(false)
    setError('')
    e.preventDefault()
    if (Date.parse(start) && Date.parse(end)){
      setIsSubmit(true)
    }else{
      setError('Please enter a valid date (2020-03-02)')
    }
  }
  
  return (
    <AdminProvider>
      <h1>Admin</h1>
      <h3>{isClient ? 'Best Clients:':'Best Profession:'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Start:</label>
        <input type="text" value={start} onChange={(e) => setStart(e.target.value)} placeholder="2019-07-04"/>
        <label>End:</label>
        <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="2020-07-04"/>
        {isClient && <label>Limit results:</label>}
        {isClient && <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="3"/>}
        <button type="submit">Submit</button>
        {error !== '' && <p>{error}</p>}
      </form>
      {isClient && isSubmit && <BestClient start={start} end={end} limit={limit}/>}
      {!isClient && isSubmit && <BestProfession start={start} end={end}/>}
    </AdminProvider>
  );
};

export default Admin;