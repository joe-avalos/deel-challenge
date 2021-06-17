import React from 'react';

import UserList from "./UserList";
import BalancesProvider from "../contexts/balances.context";

const Users = () => {
  return (
    <>
      <h1>Click on any user to change profile_id or make a deposit</h1>
      <BalancesProvider>
        <UserList/>
      </BalancesProvider>
    </>
  );
};

export default Users;