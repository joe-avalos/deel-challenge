import React, {useContext} from 'react';
import {UsersContext} from "../contexts/users.context";

const ContractDetails = ({contract}) => {
  const {users} = useContext(UsersContext)
  const client = users.filter((user) => user.id === contract.ClientId)[0]
  const contractor = users.filter((user) => user.id === contract.ContractorId)[0]
  return (
    <table className="table mt-3">
      <thead>
      <tr>
        <th scope="col" colSpan="2">Contract# {contract.id}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="col">Terms:</th>
        <td>{contract.terms}</td>
      </tr>
      <tr>
        <th scope="col">Status:</th>
        <td>{contract.status}</td>
      </tr>
      <tr>
        <th scope="col">Client:</th>
        <td>{client.firstName} {client.lastName}</td>
      </tr>
      <tr>
        <th scope="col">Contractor:</th>
        <td>{contractor.firstName} {contractor.lastName}</td>
      </tr>
      </tbody>
    </table>
  );
};

export default ContractDetails;