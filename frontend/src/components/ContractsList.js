import React, {useContext, useEffect} from 'react';
import {ContractsContext} from "../contexts/contracts.context";
import ContractDetails from "./ContractDetails";

const ContractsList = () => {
  const {contracts, fetchContracts, selected, fetchContract} = useContext(ContractsContext)
  
  useEffect(()=>{
    fetchContracts()
  },[fetchContracts])
  
  return (
    <div>
      <p className="lead">Click on any contract to view details</p>
      <blockquote className="blockquote">
        <p>Active contracts:</p>
      </blockquote>
      <table className="table">
        <thead>
        <th scope="col">ID#</th>
        <th scope="col">Terms</th>
        <th scope="col">Status</th>
        </thead>
      <tbody>
        {contracts.length > 0 && contracts.map((item) => <tr key={item.id}
                                                             onClick={() => fetchContract(item.id)}
                                                             style={{cursor: 'pointer'}}
        >
          <th scope="col">{item.id}</th>
          <td>Terms: {item.terms}</td>
          <td>Status: {item.status}</td>
        </tr>)}
      </tbody>
      </table>
      {selected && <ContractDetails contract={selected}/>}
    </div>
  );
}

export default ContractsList;