import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ authNeeded=false, children, ...rest }) => {
  const location = useLocation();
  const { auth } = useSelector((store) => store.user);

  if (!authNeeded && auth) {
		const { from } = location.state || { from: { pathname: '/' } };
		return (
			<Route {...rest}>
				<Redirect to={from} />
			</Route>
		);
	}

	if (authNeeded && !auth) {
		return (
			<Route {...rest}>
				<Redirect to={{ pathname: '/login', state: { from: location } }} />
			</Route>
		);
	}

	return <Route {...rest}>{children}</Route>;
};
