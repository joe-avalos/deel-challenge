import React, {useContext, useEffect, useState} from 'react';
import {UsersContext} from "../contexts/users.context";
import {AppContext} from "../contexts/app.context";
import {BalancesContext} from "../contexts/balances.context";

const UserList = () => {
  const {users} = useContext(UsersContext)
  const {profile, setProfile} = useContext(AppContext)
  const {makeDeposit, depositResult, depositError} = useContext(BalancesContext)
  const [showForm, setShowForm] = useState(false)
  const [payment, setPayment] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (parseInt(payment) > 0) {
      makeDeposit(payment)
    } else {
      setError('Please enter a valid number greater than 0')
    }
  }
  useEffect(() => {
    if (depositResult !== '') {
      setError('')
      setPayment('')
      setShowForm(false)
    }
  }, [depositResult])
  
  return (
    <div>
      {users.map((user) => {
        const currentUserFlag = profile?.id === user.id && user.type === 'client'
        return <div
          key={user.id}>
          <div
            onClick={() => {
              setProfile(user)
              setShowForm(false)
            }}
          >
            {user.firstName} {user.lastName}
            {currentUserFlag && <button onClick={() => setShowForm(true)}>Deposit Funds</button>}
            {showForm && currentUserFlag && <form onSubmit={handleSubmit}>
              <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)}/>
              <button type="submit">Send Payment</button>
              {error !== '' && <p>{error}</p>}
            </form>}
            {depositError !== '' && currentUserFlag && <p>{depositError}</p>}
          </div>
        </div>
      })}
      {depositResult !== '' && <p>{depositResult}</p>}
    </div>
  );
};

export default UserList;