import { CustomerList } from '@/widgets/customerList';
import { ProductList } from '@/widgets/productList';
import { CustomerEditorForm } from '@/features/manageCustomer';
import { ProductForm } from '@/features/manageProduct';
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
            <CustomerEditorForm variant="post" />
            <CustomerList />
          </TabPanel>
          <TabPanel className={style.tabPanel}>
            <ProductForm />
            <ProductList />
          </TabPanel>
          <TabPanel className={style.tabPanel}></TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};
export default MainPage;
