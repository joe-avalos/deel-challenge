import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../contexts/admin.context";

const BestProfession = ({start, end}) => {
  const {getBestProfession, adminError, bestProfession} = useContext(AdminContext)
  useEffect(() => {
    getBestProfession(start, end)
  }, [start, end])
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h6 className="card-title">
          {bestProfession}
        </h6>
      </div>
      {adminError !== '' && <p className="card-footer text-danger">
        {adminError}
      </p>}
    </div>
  );
};

export default BestProfession;