import React from 'react';

import UserList from "./UserList";
import BalancesProvider from "../contexts/balances.context";

const Users = () => {
  return (
    <div className="container">
      <p className="lead">Click on any user to change profile_id or make a deposit</p>
      <BalancesProvider>
        <UserList/>
      </BalancesProvider>
    </div>
  );
};

export default Users;