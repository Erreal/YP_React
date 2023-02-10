import React, { useEffect, useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { Loader } from '../Loader/loader';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Registration } from '../../pages/register';
import { Login } from '../../pages/login';
import { Page404 } from '../../pages/404';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { ProtectedRoute } from '../ProtectedRoute';
import { getUserData } from '../../services/actions/auth';
import { tokenRefresh } from '../../services/actions/auth';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';

function App() {
  const { ingredients } = useSelector((store) => store);
  const { token, auth } = useSelector((store) => store.user);
  const location = useLocation();
  const background = location.state && location.state.background;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    if (!auth) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        dispatch(tokenRefresh(refreshToken));
      }
      if (token) {
        dispatch(getUserData(token));
      }
    }
  }, [dispatch, token, auth]);

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
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.container}>
          <Switch location={background || location}>
            <Route path="/" exact={true}>
              {content}
            </Route>
            <ProtectedRoute authNeeded={true} path="/profile" exact={true}>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute authNeeded={true} path="/profile/orders" exact={true}>
              <ProfileOrders />
            </ProtectedRoute>
            <Route path="/register" exact={true}>
              <Registration />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <ProtectedRoute path="/forgot-password" exact={true}>
              <ForgotPassword />
            </ProtectedRoute>
            <ProtectedRoute path="/reset-password" exact={true}>
              <ResetPassword />
            </ProtectedRoute>
            <Route path={`/ingredients/:id`}>
              <section className={appStyles.detailSection}>
                <h2 className="text text_type_main-large">
                  Детали ингредиента
                </h2>
                <div className={appStyles.detailWrapper}>
                  <IngredientDetails />
                </div>
              </section>
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </main>
        {background && (
          <Route path="/ingredients/:id" exact={true}>
            <div>
              <Modal onClose={handleModalClose} title={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            </div>
          </Route>
        )}
      </DndProvider>
    </>
  );
}

export default App;
