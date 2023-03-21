import { useMemo, FC } from 'react';
import ingredientCardStyles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import { SET_CURRENT_ITEM } from '../../services/actions/ingredients';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { IIngredientCard } from '../../utils/types';
import { useAppSelector } from '../../hooks/useAppSelector';

const IngredientCard: FC<IIngredientCard> = (props) => {
  const basket = useAppSelector((store) => store.basket);
  const location = useLocation();
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props.item,
  });

  const counter = useMemo(() => {
    let count: number = 0;
    if (Object.keys(basket.bun).length && basket.bun._id === props.item._id)
      return (count += 2);
    count = basket.items.filter((item) => item._id === props.item._id).length;
    return count;
  }, [basket.bun, basket.items, props.item._id]);

  return (
    <Link
      to={{
        pathname: `/ingredients/${props.item._id}`,
        state: { background: location },
      }}
      className={ingredientCardStyles.cardlink}
      ref={dragRef}
    >
      <div
        className={`${ingredientCardStyles.card} mt-6 mb-8`}
        onClick={() =>
          dispatch({
            type: SET_CURRENT_ITEM,
            item: props.item,
          })
        }
      >
        {counter !== 0 ? <Counter count={counter} size="default" /> : null}
        <img
          className={ingredientCardStyles.cardimage}
          src={props.item.image}
          alt={props.item.name}
        />
        <div className={ingredientCardStyles.cardprice}>
          <span className="text text_type_digits-default">
            {props.item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={ingredientCardStyles.cardname}>{props.item.name}</p>
      </div>
    </Link>
  );
};

export default IngredientCard;
