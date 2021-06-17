import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../contexts/admin.context";

const BestProfession = ({start, end}) => {
  const {getBestProfession, adminError, bestProfession} = useContext(AdminContext)
  useEffect(() => {
    getBestProfession(start, end)
  }, [start, end])
  return (
    <div>
      {bestProfession}
      {adminError !== '' && <p>{adminError}</p>}
    </div>
  );
};

export default BestProfession;