import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../contexts/admin.context";

const BestClient = ({start, end, limit}) => {
  const {getBestClient, adminError, bestClient} = useContext(AdminContext)
  useEffect(() => {
    limit = limit === '' ? null : limit;
    getBestClient(start, end, limit)
  }, [start, end, limit])
  return (
    <div>
      {bestClient.map((client, idx) => <div key={idx}>
        <p>Client name: {client.fullName}</p>
        <p>Total paid: {client.paid}</p>
      </div>)}
      {adminError !== '' && <p>{adminError}</p>}
    </div>
  );
};

export default BestClient;