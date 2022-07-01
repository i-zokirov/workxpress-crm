import React from 'react'
import { Navigate, Outlet  } from "react-router-dom"
const ProtectRoute = ({children, authenticated, redirectPath = "/authentication/sign-in"}) => {
  if(!authenticated){
    return <Navigate to={redirectPath}  />;
  }
  return children ? children : <Outlet />;
}

export default ProtectRoute