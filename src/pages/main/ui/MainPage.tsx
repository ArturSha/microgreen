import { CustomerList } from '@/widgets/customerList';
import { OrderList } from '@/widgets/orderList';
import { ProductList } from '@/widgets/productList';
import { CustomerEditorForm } from '@/features/manageCustomer';
import { CreateOrderForm } from '@/features/manageOrder';
import { ProductForm } from '@/features/manageProduct';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/shared/ui/Tabs';
import style from './MainPage.module.css';

const MainPage = () => {
  return (
    <section className={style.mainPage}>
      <TabGroup style={{ width: '100%', maxWidth: '50rem' }}>
        <TabList>
          <Tab>Заказы</Tab>
          <Tab>Заведения</Tab>
          <Tab>Наличие</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className={style.tabPanel}>
            <CreateOrderForm />
            <OrderList />
          </TabPanel>
          <TabPanel className={style.tabPanel}>
            <CustomerEditorForm variant="post" />
            <CustomerList />
          </TabPanel>
          <TabPanel className={style.tabPanel}>
            <ProductForm />
            <ProductList />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};
export default MainPage;
