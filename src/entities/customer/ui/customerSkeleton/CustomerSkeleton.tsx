import { Skeleton } from '@/shared/ui/Skeleton';
import style from './CustomerSkeleton.module.css';

export const CustomerSkeleton = () => {
  return (
    <div className={style.container}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="3.6rem" />
      ))}
    </div>
  );
};
