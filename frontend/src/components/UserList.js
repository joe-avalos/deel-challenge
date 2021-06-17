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
    <div className="list-group">
      {depositResult !== '' && <p className="text-success my-1">{depositResult}</p>}
      {users.map((user) => {
        const currentUserFlag = profile?.id === user.id && user.type === 'client'
        return <div
          key={user.id}
          className="list-group-item"
          style={{cursor: 'pointer'}}
          onClick={() => {
            setProfile(user)
          }}
        >
          
          <p>{user.firstName} {user.lastName}</p>
          {currentUserFlag && !showForm && <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Deposit Funds
          </button>}
          {showForm && currentUserFlag && <form onSubmit={handleSubmit} className="container">
            <div className="row justify-content-center">
              <div className="col col-1">
                <label className="col-form-label">Amount:</label>
              </div>
              <div className="col col-2">
                <input type="text" className="form-control" value={payment}
                       onChange={(e) => setPayment(e.target.value)}/>
              </div>
              <div className="col col-2">
                <button className="btn btn-primary" type="submit">Send Payment</button>
              </div>
            </div>
            {error !== '' && <div className="row justify-content-center">
              <p className="text-danger my-1">{error}</p>
            </div>}
          </form>}
          {depositError !== '' && currentUserFlag && <p className="text-danger my-1">{depositError}</p>}
        </div>
      })}
    </div>
  );
};

export default UserList;