import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  const location = useLocation();
  
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" state={{ from: location }} />
)}

export default ProtectedRouteElement; 


