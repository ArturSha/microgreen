import PaidSvg from '@/shared/assets/icons/paid.svg?react';
import { Button } from '@/shared/ui/Button';

interface MarkOrderAsPaidButtonProps {
  id: string;
}

export const MarkOrderAsPaidButton = ({ id }: MarkOrderAsPaidButtonProps) => {
  console.log(id);

  return (
    <Button variant="clear" style={{ width: '2.8rem' }}>
      <PaidSvg />
    </Button>
  );
};
