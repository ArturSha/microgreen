import { usePatchOrderMutation } from '@/entities/order';
import DeliveredSvg from '@/shared/assets/icons/delivered.svg?react';
import { Button } from '@/shared/ui/Button';

interface MarkOrderAsDeliveredButtonProps {
  id: string;
}

export const MarkOrderAsDeliveredButton = ({ id }: MarkOrderAsDeliveredButtonProps) => {
  console.log(id);
  const [patchDeliveredTrigger] = usePatchOrderMutation();
  const onClick = async () => {
    try {
      await patchDeliveredTrigger({ id, isDelivered: true }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button style={{ width: '2.8rem' }} variant="clear" onClick={onClick}>
      <DeliveredSvg />
    </Button>
  );
};
