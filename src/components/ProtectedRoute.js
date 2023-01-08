import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/loader';

export const ProtectedRoute = ({ children, ...rest }) => {
  const userAuth = useSelector((store) => store.user.auth);
  const location = useLocation();
  const { token } = useSelector((store) => store.user);

  if (!userAuth && !token) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  if (!userAuth && token) {
    return <Loader />;
  }

  return <Route {...rest}>{children}</Route>;
};
