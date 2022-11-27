import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import data from '../../utils/data';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    const ingredientType = [
        {
            name: 'Булки',
            type: 'bun'
        },
        {
            name: 'Начинки',
            type: 'main'
        },
        {
            name: 'Соусы',
            type: 'sauce'
        }
    ];
    const dataSorted = props.data.sort((first, second) => first['type'] > second['type'] ? 1 : -1);
    console.log(dataSorted);
    return (
        <section className={ingredientsStyles.mainsection}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    {ingredientType[0].name}
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    {ingredientType[1].name}
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    {ingredientType[2].name}
                </Tab>
            </div>
            <div className={ingredientsStyles.ingredientsection}>
            {ingredientType.map((item, index) =>(
                <IngredientsGroup key={index} type={item.type} name={item.name} data={
                    dataSorted.filter(obj => {
                        return obj.type === item.type
                      })
                }/>
            ))}
            </div>
        </section>
    );
}

const IngredientsGroup = (props) => {
    return (
        <section className='mt-10'>
            <h3 className="text text_type_main-medium">
                {props.name}
            </h3>
            {data.map(item => (
                <IngredientCard 
                    key = {item.id}
                    imageSrc = {item.image}
                    name = {item.name}
                    price = {item.price}
                />
            ))}

        </section>
    );

}

const IngredientCard = (props) => {
    <div>
        <img src={props.imageSrc} alt=""/>
        <div className={ingredientsStyles.priceblock}>
            <span>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
    </div>
}

export default BurgerIngredients;