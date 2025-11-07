import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PopoverButton, Popover, PopoverPanel } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import type { Customer } from '../../model/types/customer';
import style from './CustomerCard.module.css';

interface CustomerProps {
  data: Customer;
  children: ReactNode;
}

export const CustomerCard = ({ data, children }: CustomerProps) => {
  const { name, debt, address, contactPerson, phone, notes } = data;
  return (
    <Popover>
      <PopoverButton>
        <div className={style.customerCard}>
          <Text as="span">{name}</Text>
          <Text as="span">{debt}</Text>
        </div>
      </PopoverButton>
      <PopoverPanel anchor="bottom">
        <div className={style.popoverContainer}>
          <div>
            <Text bold>{name}</Text>
            {address && <Text>{address}</Text>}
            {contactPerson && <Text>{contactPerson}</Text>}
            {phone && (
              <Text>
                <Link className={style.phoneLink} to={`tel:${phone}`}>
                  {phone}
                </Link>
              </Text>
            )}
            {notes && <Text>{notes}</Text>}
          </div>
          {children}
        </div>
      </PopoverPanel>
    </Popover>
  );
};
