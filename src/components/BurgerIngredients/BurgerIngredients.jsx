import React, { useRef, useEffect, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { DETAIL_HEADER, INGREDIENTS_TYPES } from '../../utils/constants';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ORDER_RESET } from '../../services/actions/order';
import { RESET_CURRENT_ITEM } from '../../services/actions';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.items);
  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );
  const order = useSelector((store) => store.order);
  const [currentTab, setCurrentTab] = React.useState('0');

  const [bunRef, bunInView] = useInView();
  const [mainRef, mainInView] = useInView();
  const [sauceRef, sauceInView] = useInView();

  const mainScrollRef = useRef();
  const bunScrollRef = useRef();
  const sauceScrollRef = useRef();
  const buns = useMemo(
    () => ingredients.filter((obj) => obj.type === INGREDIENTS_TYPES[0].type),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients.filter((obj) => obj.type === INGREDIENTS_TYPES[1].type),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients.filter((obj) => obj.type === INGREDIENTS_TYPES[2].type),
    [ingredients]
  );

  useEffect(() => {
    if (bunInView) {
      setCurrentTab(INGREDIENTS_TYPES[0].place);
    } else if (mainInView) {
      setCurrentTab(INGREDIENTS_TYPES[1].place);
    } else if (sauceInView) {
      setCurrentTab(INGREDIENTS_TYPES[2].place);
    }
  }, [bunInView, sauceInView, mainInView]);

  const onTabClick = (evt) => {
    setCurrentTab(evt);
    if (evt === INGREDIENTS_TYPES[0].place) {
      bunScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (evt === INGREDIENTS_TYPES[1].place) {
      mainScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (evt === INGREDIENTS_TYPES[2].place) {
      sauceScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className={ingredientsStyles.mainsection}>
        <h2 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h2>
        {Object.keys(ingredients).length && (
          <>
            <div className={ingredientsStyles.tabs}>
              {INGREDIENTS_TYPES.map((item) => (
                <Tab
                  value={item.place}
                  key={item.type}
                  active={currentTab === item.place}
                  onClick={onTabClick}
                >
                  {item.name}
                </Tab>
              ))}
            </div>
            <div className={ingredientsStyles.scrollsection}>
              {INGREDIENTS_TYPES.map((item) => (
                <section
                  className="mt-10"
                  key={item.type}
                  ref={
                    item.type === INGREDIENTS_TYPES[0].type
                      ? bunScrollRef
                      : item.type === INGREDIENTS_TYPES[1].type
                      ? mainScrollRef
                      : sauceScrollRef
                  }
                >
                  <h3
                    className="text text_type_main-medium"
                    ref={
                      item.type === INGREDIENTS_TYPES[0].type
                        ? bunRef
                        : item.type === INGREDIENTS_TYPES[1].type
                        ? mainRef
                        : sauceRef
                    }
                  >
                    {item.name}
                  </h3>
                  <div className={ingredientsStyles.groupinner}>
                    {item.type === INGREDIENTS_TYPES[0].type
                      ? buns.map((item) => (
                          <IngredientCard key={item._id} item={item} />
                        ))
                      : item.type === INGREDIENTS_TYPES[1].type
                      ? main.map((item) => (
                          <IngredientCard key={item._id} item={item} />
                        ))
                      : sauce.map((item) => (
                          <IngredientCard key={item._id} item={item} />
                        ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </section>
      {Object.keys(currentIngredient).length ? (
        <Modal
          onClose={() => dispatch({ type: RESET_CURRENT_ITEM })}
          title={DETAIL_HEADER}
        >
          <IngredientDetails item={currentIngredient} />
        </Modal>
      ) : null}
      {order.number ? (
        <Modal onClose={() => dispatch({ type: ORDER_RESET })}>
          <OrderDetails number={order.number} name={order.name} />
        </Modal>
      ) : null}
    </>
  );
};

export default BurgerIngredients;
