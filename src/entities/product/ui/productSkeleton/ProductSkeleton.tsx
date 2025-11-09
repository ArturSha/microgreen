import { Skeleton } from '@/shared/ui/Skeleton';
import style from './ProductSkeleton.module.css';

export const ProductSkeleton = () => {
  return (
    <div className={style.container}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="3.4rem" />
      ))}
    </div>
  );
};
