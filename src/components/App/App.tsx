import React, { useEffect, useMemo, FC } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { Loader } from '../Loader/loader';
import { Modal } from '../Modal/Modal';
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
import { ForgotPassword } from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import { ROUTES } from '../../utils/constants';
import { TStateReducer } from '../../services/reducers/ingredients';
import { IIngredients, ILocationState } from '../../utils/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const App: FC = () => {
  const { ingredients } = useSelector((store: IIngredients) => store);
  const { token, auth } = useSelector((store: TStateReducer) => store.user);
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    if (!auth) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        dispatch(tokenRefresh());
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
            <Route path={ROUTES.MAIN} exact={true}>
              {content}
            </Route>
            <ProtectedRoute
              authNeeded={true}
              path={ROUTES.PROFILE}
              exact={true}
            >
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute
              authNeeded={true}
              path={ROUTES.PROFILE_ORDERS}
              exact={true}
            >
              <ProfileOrders />
            </ProtectedRoute>
            <Route path={ROUTES.REGISTER} exact={true}>
              <Registration />
            </Route>
            <Route path={ROUTES.LOGIN} exact={true}>
              <Login />
            </Route>
            <ProtectedRoute path={ROUTES.FORGOT_PASS} exact={true}>
              <ForgotPassword />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.RESET_PASS} exact={true}>
              <ResetPassword />
            </ProtectedRoute>
            <Route path={ROUTES.INGREDIENT}>
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
          <Route path={ROUTES.INGREDIENT} exact={true}>
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
};

export default App;
