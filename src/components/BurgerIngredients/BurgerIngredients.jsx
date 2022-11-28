import React, {useRef, useEffect} from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import PropTypes from "prop-types";
import ingredientType from '../../utils/types';



const BurgerIngredients = (props) => {
    const [current, setState] = React.useState('one');
    const scrollRefs = useRef(current);
    
    useEffect(() => {
        scrollRefs.current.scrollIntoView({ behavior: "smooth" });
    });
    const ingredientType = [
        {
            name: 'Булки',
            type: 'bun',
            place: 'one'
        },
        {
            name: 'Начинки',
            type: 'main',
            place: 'two'
        },
        {
            name: 'Соусы',
            type: 'sauce',
            place: 'three'
        }
    ];

    return (
        <section className={ingredientsStyles.mainsection}>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <div className={ingredientsStyles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setState}>
                    {ingredientType[0].name}
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setState}>
                    {ingredientType[1].name}
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setState}>
                    {ingredientType[2].name}
                </Tab>
            </div>
            <div className={ingredientsStyles.scrollsection}>
                {ingredientType.map(item => 
                    (<section className='mt-10' ref={current === item.place ? scrollRefs : null} key={item.type}>
                        <h3 className="text text_type_main-medium">
                            {item.name}
                        </h3>
                        <div className={ingredientsStyles.groupinner}>
                            {props.data.filter(obj => {
                                return obj.type === item.type}).map(item => (
                                <IngredientCard key={item._id} imageSrc={item.image} name={item.name} price={item.price} />
                            ))}
                        </div>
                    </section>
                    ))}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired
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

IngredientCard.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}
export default BurgerIngredients;