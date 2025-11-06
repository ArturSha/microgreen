import { Skeleton } from '@/shared/ui/Skeleton';

export const CustomerSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} height="2rem" />
      ))}
    </div>
  );
};
