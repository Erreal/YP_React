import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ORDER_STATUS } from '../../utils/constants';
import { IIngredientParams, IIngredients, TOrderCard } from '../../utils/types';
import orderInfoStyles from './OrderInfo.module.css';

export const OrderInfo: FC<TOrderCard> = (props) => {
  const { number, name, status, ingredients, createdAt } = props;

  const ingredientsList = useSelector(
    (store: IIngredients) => store.ingredients.items
  );
  const composition = useMemo(() => {
    return ingredients
      .map((el) => {
        return ingredientsList.find((item) => item._id === el);
      })
      .filter((el) => el !== null) as IIngredientParams[];
  }, [ingredients, ingredientsList]);
  const countItems = (
    obj: Array<IIngredientParams | false | undefined>
  ): Array<IIngredientParams> => {
    const tempResult: { [key: string]: IIngredientParams & { count: number } } =
      {};
    for (let element of obj) {
      if (typeof element != 'undefined' && typeof element != 'boolean')
        tempResult[element._id] = {
          ...element,
          count: tempResult[element._id]
            ? tempResult[element._id].count + 1
            : 1,
        };
    }

    return Object.values(tempResult);
  };
  const totalPrice = useMemo(
    () =>  {
      if (typeof composition[0] !== 'undefined') {
        return composition.reduce((a, b) => a + b.price, 0)
      }
    },
    [composition]
  );
  return (
    <div className={orderInfoStyles.wrap}>
      <div
        className={`${orderInfoStyles.center} text text_type_digits-default pb-10`}
      >
        #{number}
      </div>
      <div className="text text_type_main-medium pb-3">{name}</div>
      <div className="text text_type_main-default pb-15">
        {status === 'done'
          ? ORDER_STATUS.DONE
          : status === 'created'
          ? ORDER_STATUS.CREATED
          : status === 'pending'
          ? ORDER_STATUS.PENDING
          : ORDER_STATUS.CANSELED}
      </div>
      <div className="text text_type_main-medium pb-6">Состав:</div>
      <ul className={orderInfoStyles.composition}>
        {countItems(composition).map((item) => {
          return (
            <li className={orderInfoStyles.ingredient} key={item._id}>
              <div className={orderInfoStyles.ingredientImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className="text text_type_main-default ml-4">
                {item.name}
              </div>
              <div
                className={`${orderInfoStyles.price} text text_type_digits-default`}
              >
                <span className="mr-2">
                  {item.count} x {item.price}
                </span>{' '}
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={orderInfoStyles.meta}>
        <div className="text text_type_main-default text_color_inactive">
          {createdAt && <FormattedDate date={new Date(createdAt)} />}
        </div>
        <div
          className={`${orderInfoStyles.price} text text_type_digits-default`}
        >
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
