import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import {AppContext} from "../contexts/app.context";

const PrivateRoute = ({children, ...rest}) => {
  const {profile} = useContext(AppContext)
  let auth = profile !== null
  return (
    <Route
      {...rest}
      render={({location})=>auth ? children : (<Redirect to={{
          pathname: '/',
          state: { from: location}
        }}
      />)
      }
    />
  );
};

export default PrivateRoute;