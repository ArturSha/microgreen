import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCY } from '@/shared/const';
import { PopoverButton, Popover, PopoverPanel } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';
import type { Customer } from '../../model/types/customer';
import style from './CustomerCard.module.css';

interface CustomerProps {
  data: Customer;
  children: ReactNode;
  className?: string;
}

export const CustomerCard = ({ data, className, children }: CustomerProps) => {
  const { name, debt, address, contactPerson, phone, notes, clientCode } = data;

  return (
    <Popover>
      <PopoverButton className={classNames(style.customerCard, className)}>
        <Text bold as="span">
          {name}
        </Text>
        <Text bold as="span">
          {debt + CURRENCY}
        </Text>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className={style.popoverContainer}>
        <div className={style.infoContainer}>
          <Text fontSize="m" bold>
            {name}
          </Text>
          {address && <Text>{address}</Text>}
          {contactPerson && <Text>{contactPerson}</Text>}
          {phone && (
            <Text>
              <Link className={style.phoneLink} to={`tel:${phone}`}>
                {phone}
              </Link>
            </Text>
          )}
          {clientCode && <Text className={style.mt4}>{clientCode}</Text>}
          {notes && (
            <Text fontSize="xxs" className={style.mt4}>
              *{notes}
            </Text>
          )}
        </div>
        {children}
      </PopoverPanel>
    </Popover>
  );
};
