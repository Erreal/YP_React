import { FC, ReactNode } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { ILocationState } from '../utils/types';
import { useAppSelector } from '../hooks/useAppSelector';

interface IProtectedRoute {
  authNeeded?: boolean;
  children: ReactNode;
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
  const { token } = useAppSelector((store) => store.user);
  const accessToken = token ? token : localStorage.getItem('accessToken');

  if (!authNeeded && accessToken) {
    const { from }: any = location.state?.from || { from: { pathname: ROUTES.MAIN } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (authNeeded && !accessToken) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
