import { AddCustomer } from '@/entities/customers';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/shared/ui/Tabs';
import style from './MainPage.module.css';

const MainPage = () => {
  return (
    <section className={style.mainPage}>
      <TabGroup>
        <TabList>
          <Tab>Заказы</Tab>
          <Tab>Заведения</Tab>
          <Tab>Наличие</Tab>
          <Tab>Долги</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className={style.tabPanel}></TabPanel>
          <TabPanel className={style.tabPanel}>
            <AddCustomer />
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};
export default MainPage;
