import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../contexts/admin.context";

const BestClient = ({start, end, limit}) => {
  const {getBestClient, adminError, bestClient} = useContext(AdminContext)
  useEffect(() => {
    limit = limit === '' ? null : limit;
    getBestClient(start, end, limit)
  }, [start, end, limit])
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