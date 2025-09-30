import { Tab as TabHeadless, type TabProps } from '@headlessui/react';
import classNames from 'classnames';
import style from './Tab.module.css';

export const Tab = (props: TabProps) => {
  const { className, ...rest } = props;
  return <TabHeadless className={classNames(style.tab, className)} {...rest} />;
};
