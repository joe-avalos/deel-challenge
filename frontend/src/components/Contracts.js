import React from 'react';
import ContractsProvider from "../contexts/contracts.context";
import ContractsList from "./ContractsList";

const Contracts = () => {
  
  return (
    <ContractsProvider>
      <ContractsList/>
    </ContractsProvider>
  );
};

export default Contracts;