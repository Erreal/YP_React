import React, { useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = () => {
  const ingredients = useSelector((store) => store.ingredients.items);
  const [currentTab, setCurrentTab] = React.useState('0');
  const [bunRef, bunInView] = useInView();
  const [mainRef, mainInView] = useInView();
  const [sauceRef, sauceInView] = useInView();

  const mainScrollRef = useRef();
  const bunScrollRef = useRef();
  const sauceScrollRef = useRef();

  useEffect(() => {
    if (bunInView) {
      setCurrentTab('0');
    } else if (mainInView) {
      setCurrentTab('1');
    } else if (sauceInView) {
      setCurrentTab('2');
    }
  }, [bunInView, sauceInView, mainInView]);
  const onTabClick = (evt) => {
    setCurrentTab(evt);
    if (evt === '0') {
      bunScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (evt === '1') {
      mainScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (evt === '2') {
      sauceScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
                onClick={onTabClick}
              >
                {item.name}
              </Tab>
            ))}
          </div>
          <div className={ingredientsStyles.scrollsection}>
            {ingredientType.map((item) => (
              <section
                className="mt-10"
                key={item.type}
                ref={
                  item.type === 'bun'
                    ? bunScrollRef
                    : item.type === 'main'
                    ? mainScrollRef
                    : sauceScrollRef
                }
              >
                <h3
                  className="text text_type_main-medium"
                  ref={
                    item.type === 'bun'
                      ? bunRef
                      : item.type === 'main'
                      ? mainRef
                      : sauceRef
                  }
                >
                  {item.name}
                </h3>
                <div className={ingredientsStyles.groupinner}>
                  {ingredients
                    .filter((obj) => {
                      return obj.type === item.type;
                    })
                    .map((item) => (
                      <IngredientCard key={item._id} item={item} />
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
