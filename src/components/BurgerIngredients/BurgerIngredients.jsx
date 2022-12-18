import React, { useRef, useEffect, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import {useSelector, useDispatch} from 'react-redux';
import { OPEN_MODAL } from '../../services/actions/modal';

const BurgerIngredients = () => {
  const ingredients = useSelector(store => store.ingredients.items);
  const [currentTab, setCurrentTab] = React.useState('0');
 
  const scrollRefs = useRef(currentTab);

  useEffect(() => {
    if (Object.keys(ingredients).length) {
      scrollRefs.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTab, ingredients]);
  const ingredientType = [
    {
      name: 'Булки',
      type: 'bun',
      place: '0',
    },
    {
      name: 'Начинки',
      type: 'main',
      place: '1',
    },
    {
      name: 'Соусы',
      type: 'sauce',
      place: '2',
    },
  ];

  return (
    <section className={ingredientsStyles.mainsection}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      {Object.keys(ingredients).length && (
        <>
          <div className={ingredientsStyles.tabs}>
            {ingredientType.map((item) => (
              <Tab
                value={item.place}
                key={item.type}
                active={currentTab === item.place}
                onClick={setCurrentTab}
              >
                {item.name}
              </Tab>
            ))}
          </div>
          <div className={ingredientsStyles.scrollsection}>
            {ingredientType.map((item) => (
              <section
                className="mt-10"
                ref={currentTab === item.place ? scrollRefs : null}
                key={item.type}
              >
                <h3 className="text text_type_main-medium">{item.name}</h3>
                <div className={ingredientsStyles.groupinner}>
                  {ingredients
                    .filter((obj) => {
                      return obj.type === item.type;
                    })
                    .map((item) => (
                      <IngredientCard
                        key={item._id}
                        item={item}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
