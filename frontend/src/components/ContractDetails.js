import React, {useContext} from 'react';
import {UsersContext} from "../contexts/users.context";

const ContractDetails = ({contract}) => {
  const {users} = useContext(UsersContext)
  const client = users.filter((user) => user.id === contract.ClientId)[0]
  const contractor = users.filter((user) => user.id === contract.ContractorId)[0]
  return (
    <table>
      <tbody>
      <tr>
        <th>Terms:</th>
        <td>{contract.terms}</td>
      </tr>
      <tr>
        <th>Status:</th>
        <td>{contract.status}</td>
      </tr>
      <tr>
        <th>Client:</th>
        <td>{client.firstName} {client.lastName}</td>
      </tr>
      <tr>
        <th>Contractor:</th>
        <td>{contractor.firstName} {contractor.lastName}</td>
      </tr>
      </tbody>
    </table>
  );
};

export default ContractDetails;