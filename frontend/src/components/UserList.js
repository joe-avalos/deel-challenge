import React, {useContext} from 'react';
import {UsersContext} from "../contexts/users.context";
import {AppContext} from "../contexts/app.context";

const UserList = () => {
  const {users} = useContext(UsersContext)
  const {setProfile} = useContext(AppContext)
  return (
    <div>
      <ul>
        {users.map((user)=><li onClick={()=>{
          console.log('click',user.id)
          setProfile(user)
        }} key={user.id}>{user.firstName} {user.lastName}</li>)}
      </ul>
    </div>
  );
};

export default UserList;