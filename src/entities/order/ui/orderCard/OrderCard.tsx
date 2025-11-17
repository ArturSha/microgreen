import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCY } from '@/shared/const';
import { Text } from '@/shared/ui/Text';
import type { Order } from '../../model/types/order';
import style from './OrderCard.module.css';

interface OrderCardProps {
  data: Order;
  short?: boolean;
  children: ReactNode;
}

export const OrderCard = ({ data, short = false, children }: OrderCardProps) => {
  const { customer, deliveryDate, isDelivered, products, totalPrice } = data;
  return (
    <div className={style.orderCard}>
      <div
        className={classNames(style.infoContainer, style.header, {
          [style.delivered]: isDelivered,
        })}
      >
        <Text fontSize="l" color={isDelivered ? 'blue' : 'beige'} bold>
          {customer.name}
        </Text>
        <Text bold fontSize="m" color={isDelivered ? 'blue' : 'beige'}>
          {new Date(deliveryDate).toLocaleDateString()}
        </Text>
      </div>
      <div className={classNames(style.infoContainer, { [style.delivered]: isDelivered })}>
        {!short && (
          <div>
            <Text color={isDelivered ? 'blue' : 'beige'}> {customer.address}</Text>
            <Text color={isDelivered ? 'blue' : 'beige'}>
              {customer.contactPerson ? customer.contactPerson + ': ' : ''}
              <Link className={style.phoneLink} to={`tel:${customer.phone}`}>
                {customer.phone}
              </Link>
            </Text>
            {customer.notes && (
              <Text fontSize="xxs" color={isDelivered ? 'blue' : 'beige'} className={style.mt4}>
                *{customer.notes}
              </Text>
            )}
          </div>
        )}
        {children}
      </div>
      <div>
        {products.map((product) => (
          <div
            className={classNames(style.productContainer, { [style.deliveredBorder]: isDelivered })}
            key={product.id}
          >
            <Text bold color={isDelivered ? 'blue' : 'black'}>
              {product.name}
            </Text>
            <Text bold className={classNames(style.quantity, { [style.delivered]: isDelivered })}>
              {product.quantity}
            </Text>
          </div>
        ))}
      </div>
      <div className={classNames(style.priceContainer, { [style.delivered]: isDelivered })}>
        <Text bold color={isDelivered ? 'blue' : 'beige'}>
          Стоимость:
        </Text>
        <Text bold color={isDelivered ? 'blue' : 'beige'} className={style.price}>
          {totalPrice ? totalPrice + CURRENCY : ''}
        </Text>
      </div>
    </div>
  );
};
