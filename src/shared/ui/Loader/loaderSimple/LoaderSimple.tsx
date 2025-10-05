import style from './LoaderSimple.module.css';

export const LoaderSimple = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loading}></div>
    </div>
  );
};
