import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";

const BurgerConstructor = (props) => {
    return (
        <section className={`${constructorStyles.mainsection} pt-25 ml-10`}>
            <div className={`${constructorStyles.constructorWrapper} mb-10`}>
                <div className={constructorStyles.constructorBunItem}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </div>
                <div className={constructorStyles.constructorInner}>
                    {props.basket.map((item, index) => (
                        <div className={constructorStyles.constructorItem} key={index}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className={constructorStyles.constructorBunItem}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </div>
            </div>
            <div className={constructorStyles.checkout}>
                <span className={`${constructorStyles.checkoutTotal} text text_type_main-large`}>
                    2251 
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

const basketTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
})

BurgerConstructor.propTypes = {
    basket: PropTypes.arrayOf(basketTypes).isRequired
} 

export default BurgerConstructor;