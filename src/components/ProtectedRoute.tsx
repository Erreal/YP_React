import React, { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../utils/constants';
import { TStateReducer } from '../services/reducers/ingredients';
import { ILocationState } from '../utils/types';

interface IProtectedRoute {
  authNeeded?: boolean;
  children: any;
  rest?: string;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  authNeeded = false,
  children,
  ...rest
}) => {
  const location = useLocation<ILocationState>();
  const { auth } = useSelector((store: TStateReducer) => store.user);

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
