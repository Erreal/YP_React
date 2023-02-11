import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from '../utils/constants';

export const ProtectedRoute = ({ authNeeded = false, children, ...rest }) => {
  const location = useLocation();
  const { auth } = useSelector((store) => store.user);

  if (!authNeeded && auth) {
    const { from } = location.state || { from: { pathname: ROUTES.MAIN } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (authNeeded && !auth) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
ProtectedRoute.propTypes = {
  authNeeded: PropTypes.bool,
  children: PropTypes.element.isRequired,
  rest: PropTypes.shape({
    path: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    computedMatch: PropTypes.object.isRequired,
  }),
};
