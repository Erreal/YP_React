import React, { useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import IngredientCard from '../IngredientCard/IngredientCard';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = React.useState('one');
  const [modal, setModal] = React.useState({ visible: false });
  const [popupItem, setPopupItem] = React.useState({});

  const handleOpenModal = () => {
    setModal({ visible: true });
  };

  const handleCloseModal = () => {
    setModal({ visible: false });
  };
  const scrollRefs = useRef(currentTab);

  useEffect(() => {
    scrollRefs.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentTab]);
  const ingredientType = [
    {
      name: 'Булки',
      type: 'bun',
      place: 'one',
    },
    {
      name: 'Начинки',
      type: 'main',
      place: 'two',
    },
    {
      name: 'Соусы',
      type: 'sauce',
      place: 'three',
    },
  ];

  return (
    <section className={ingredientsStyles.mainsection}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <div className={ingredientsStyles.tabs}>
        <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>
          {ingredientType[0].name}
        </Tab>
        <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>
          {ingredientType[1].name}
        </Tab>
        <Tab
          value="three"
          active={currentTab === 'three'}
          onClick={setCurrentTab}
        >
          {ingredientType[2].name}
        </Tab>
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
              {props.data
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
      {modal.visible && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails item={popupItem} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
