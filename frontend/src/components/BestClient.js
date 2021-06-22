import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../contexts/admin.context";

const BestClient = ({start, end, limit, isSubmit, setSubmit}) => {
  const {getBestClient, adminError, bestClient} = useContext(AdminContext)
  useEffect(() => {
    if (isSubmit) {
      getBestClient(start, end, limit)
      setSubmit(false)
    }
  }, [start, end, limit, isSubmit, setSubmit, getBestClient])
  
  return (
    <div className="container mt-3">
      {bestClient.map((client, idx) => <div className="card" key={idx}>
        <div className="card-body">
          <h6 className="card-title">Client name: {client.fullName}</h6>
          <p className="card-text">Total paid: {client.paid}</p>
          {adminError !== '' && <p className="card-footer text-danger">
            {adminError}
          </p>}
        </div>
      </div>)}
    </div>
  );
};

export default BestClient;