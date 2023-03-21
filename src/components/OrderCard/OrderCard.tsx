import { FC, useMemo } from 'react';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './OrderCard.module.css';
import { IIngredientParams, TOrderCard } from '../../utils/types';
import { ORDER_STATUS } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

export const OrderCard: FC<TOrderCard> = (props) => {
  const { number, name, status, ingredients, createdAt, showStatus } = props;
  const ingredientsList = useAppSelector(
    (store) => store.ingredients.items
  );
  const location = useLocation();

  const composition = useMemo(() => {
    return ingredients
      .map((el) => {
        return ingredientsList.find((item) => item._id === el);
      })
      .filter((el) => el !== null) as IIngredientParams[];
  }, [ingredients, ingredientsList]);

  const totalPrice = useMemo(
    () => composition.reduce((a, b) => a + b.price, 0),
    [composition]
  );

  return (
    <Link
      className={`${cardStyles.wrapper} p-6 mb-4`}
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location, order: props },
      }}
    >
      <div className={`${cardStyles.orderBlock} mb-6`}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>
      <div className="text text_type_main-medium">{name}</div>
      {showStatus && (
        <div className="text text_type_main-default mt-2">
          {status === 'done'
            ? ORDER_STATUS.DONE
            : status === 'created'
            ? ORDER_STATUS.CREATED
            : status === 'pending'
            ? ORDER_STATUS.PENDING
            : ORDER_STATUS.CANSELED}
        </div>
      )}
      <div className={`${cardStyles.orderBlock} mt-6`}>
        <ul className={cardStyles.imageList}>
          {composition.map((item, i) => {
            if (i > 5) {
              return false;
            }
            const rest = composition.length - 6;
            const zIndex = composition.length - i;
            return (
              <li
                className={cardStyles.ingredient}
                style={{ zIndex: zIndex }}
                key={i}
              >
                <img src={item?.image} alt={item?.name} />
                {i === 5 && rest > 0 && <span>+{rest}</span>}
              </li>
            );
          })}
        </ul>
        <span className={`${cardStyles.price} text text_type_digits-default`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </Link>
  );
};
