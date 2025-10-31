import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCY } from '@/shared/const';
import { Text } from '@/shared/ui/Text';
import type { Order } from '../../model/types/order';
import style from './OrderCard.module.css';

interface OrderCardProps {
  data: Order;
  children: ReactNode;
}

export const OrderCard = ({ data, children }: OrderCardProps) => {
  const { customer, deliveryDate, isDelivered, products, totalPrice } = data;
  return (
    <div className={style.orderCard}>
      <div
        className={classNames(style.infoContainer, style.borderRadiusTop, {
          [style.delivered]: isDelivered,
        })}
      >
        <Text>{customer.name}</Text>
        <Text>{new Date(deliveryDate).toLocaleDateString()}</Text>
      </div>
      <div className={classNames(style.infoContainer, { [style.delivered]: isDelivered })}>
        <div>
          <Text> {customer.address}</Text>
          <Text>
            {customer.contactPerson ? customer.contactPerson + ': ' : ''}
            <Link className={style.phoneLink} to={`tel:${customer.phone}`}>
              {customer.phone}
            </Link>
          </Text>
        </div>
        {children}
      </div>
      <div>
        {products.map((product) => (
          <div className={style.productContainer} key={product.id}>
            <Text> {product.name}</Text>
            <Text className={style.price}>{product.quantity}</Text>
          </div>
        ))}
      </div>
      <div className={style.totalPrice}>
        <Text>Стоимость:</Text>
        <Text>{totalPrice ? totalPrice + CURRENCY : ''}</Text>
      </div>
    </div>
  );
};
