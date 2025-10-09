import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import style from './CreateOrder.module.css';

export const CreateOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className={style.width}>
        Добавить новый заказ
      </Button>
      <Dialog
        maxWidth="40rem"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeButton
      >
        привет
      </Dialog>
    </>
  );
};
