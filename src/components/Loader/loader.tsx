import { FC } from 'react';
import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

type TLoader = {
  size: string;
  inverse?: boolean;
};
type TLoaderSizes = {
  [key: string]: number;
};
const loaderSizes: TLoaderSizes = {
  small: 16,
  medium: 24,
  large: 40,
};
export const Loader: FC<TLoader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};
