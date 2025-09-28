import { Loader } from '@/shared/ui/Loader';
import style from './MainPage.module.css';

const MainPage = () => {
  return (
    <section className={style.mainPage}>
      <Loader />
    </section>
  );
};
export default MainPage;
