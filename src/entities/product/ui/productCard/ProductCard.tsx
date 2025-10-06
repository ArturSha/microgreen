import style from './ProductCard.module.css';

interface ProductCardProps {
  name: string;
}

export const ProductCard = ({ name }: ProductCardProps) => {
  return <div className={style.productCard}>{name}</div>;
};
