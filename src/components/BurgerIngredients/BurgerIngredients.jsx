import React, { useRef, useEffect, useContext } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useAPI } from '../../utils/appContext';
import { Basket } from '../../utils/appContext';

const BurgerIngredients = () => {
  const { ingredients } = useAPI();
  const { basketDispatcher } = useContext(Basket);
  const [currentTab, setCurrentTab] = React.useState('0');
  const [modal, setModal] = React.useState({ visible: false });
  const [popupItem, setPopupItem] = React.useState({});

  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };
  useEffect(() => {
    if (Object.keys(popupItem).length && popupItem.type === 'bun') {
      basketDispatcher({
        type: 'addBun',
        bun: popupItem,
        price: popupItem.price,
      });
    } else if (Object.keys(popupItem).length && popupItem.type !== 'bun') {
      basketDispatcher({
        type: 'addItem',
        item: popupItem,
        price: popupItem.price,
      });
    } else {
      return;
    }
  }, [popupItem, basketDispatcher]);

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
                        onClick={handleOpenModal}
                        setPopup={setPopupItem}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
      {modal.visible && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails item={popupItem} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
