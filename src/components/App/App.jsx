import React, { useEffect, useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { Loader } from '../Loader/loader';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Registration } from '../../pages/register';
import { Login } from '../../pages/login';
import { Page404 } from '../../pages/404';
import { Profile } from '../../pages/profile';
import { ProtectedRoute } from '../ProtectedRoute';
import { getUserData } from '../../services/actions/auth';
import { tokenRefresh } from '../../services/actions/auth';

function App() {
  const { ingredients } = useSelector((store) => store);
  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  /*useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(tokenRefresh(refreshToken));
    }
    if (token) {
      dispatch(getUserData(refreshToken));
    }
  }, [dispatch, token]);*/

  const content = useMemo(() => {
    return ingredients.itemsRequest ? (
      <Loader size="large" />
    ) : (
      <>
        <BurgerIngredients />
        <BurgerConstructor />
      </>
    );
  }, [ingredients.itemsRequest]);

  return (
    <Router>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.container}>
          <Switch>
            <Route path="/" exact={true}>
              {content}
            </Route>
            <ProtectedRoute path="/profile" exact={true}>
              <Profile />
            </ProtectedRoute>
            <Route path="/register" exact={true}>
              <Registration />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </main>
      </DndProvider>
    </Router>
  );
}

export default App;
