import React, {useContext, useEffect} from 'react';
import {ContractsContext} from "../contexts/contracts.context";
import ContractDetails from "./ContractDetails";

const ContractsList = () => {
  const {contracts, fetchContracts, selected, fetchContract} = useContext(ContractsContext)
  
  useEffect(()=>{
    fetchContracts()
  },[])
  
  return (
    <div>
      <h1>Click on any contract to view details</h1>
      <ul>
        {contracts.length > 0 && contracts.map((item) => <li key={item.id} onClick={() => fetchContract(item.id)}>
          {item.id}
        </li>)}
      </ul>
      {selected && <ContractDetails contract={selected}/>}
    </div>
  );
}

export default ContractsList;