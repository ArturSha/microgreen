import { Skeleton } from '@/shared/ui/Skeleton';

export const ProductSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="3.4rem" />
      ))}
    </div>
  );
};
