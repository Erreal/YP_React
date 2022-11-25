import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={ingredientsStyles.mainsection}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={ingredientsStyles.ingredientsection}>
                <IngredientsGroup />
            </div>
        </section>
    );
}

const IngredientsGroup = (props) => {
    return (
        <section className='mt-10'>
            <h3 className="text text_type_main-medium">
                {props.groupTitle}
            </h3>

        </section>
    );

}

const IngredientCard = (props) => {
    <div>
        <img src={props.imageSrc} />
    </div>
}

export default BurgerIngredients;