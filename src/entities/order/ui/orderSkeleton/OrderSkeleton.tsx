import { Skeleton } from '@/shared/ui/Skeleton';

export const OrderSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} borderRadius="4rem" height="15rem" />
      ))}
    </div>
  );
};
