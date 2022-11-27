import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';

const BurgerConstructor = (props) => {
    return (
        <section className={`${constructorStyles.mainsection} pt-25 ml-10`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='mb-10'>
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
                    <div className={constructorStyles.constructorItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                        />
                    </div>
                    <div className={constructorStyles.constructorItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                        />
                    </div>
                    <div className={constructorStyles.constructorItem}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                        />
                    </div>
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
                    450 
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;