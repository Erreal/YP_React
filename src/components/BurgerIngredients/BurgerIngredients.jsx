import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('one');
    const tabClick = (evt) => {
        console.log(evt);
        //document.getElementById('title').scrollIntoView();
        setCurrent();
    }
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

    return (
        <section className={ingredientsStyles.mainsection}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={tabClick}>
                    {ingredientType[0].name}
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={tabClick}>
                    {ingredientType[1].name}
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={tabClick}>
                    {ingredientType[2].name}
                </Tab>
            </div>
            <div className={ingredientsStyles.scrollsection}>
            {ingredientType.map((item, index) => (
                <IngredientsGroup key={index} type={item.type} name={item.name} data={
                    props.data.filter(obj => {
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
            <div className={ingredientsStyles.groupinner}>
                {props.data.map(item => (
                    <IngredientCard key={item._id} imageSrc={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </section>
    );

}

const IngredientCard = (props) => {
    return (
        <div className={`${ingredientsStyles.card} mt-6 mb-8`}>
            <img className={ingredientsStyles.cardimage} src={props.imageSrc} alt={props.name}/>
            <div className={ingredientsStyles.cardprice}>
                <span className="text text_type_digits-default">{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={ingredientsStyles.cardname}>{props.name}</p>
        </div>
    );
}

export default BurgerIngredients;