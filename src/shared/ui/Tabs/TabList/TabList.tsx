import type { TabListProps } from '@headlessui/react';
import { TabList as TabListHeadless } from '@headlessui/react';
import style from './TabList.module.css';

export const TabList = (props: TabListProps) => {
  return <TabListHeadless {...props} className={`${style.tabList} ${props.className} `} />;
};
