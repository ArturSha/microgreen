import style from './Loader.module.css';

export const Loader = () => {
  return (
    <>
      <div className={style.logoLoaderOverlay}></div>
      <div className={style.logoLoader}>
        <svg className={style.greenFlowerSeven} viewBox="0 0 52.45 55.83">
          <path
            d="M-187,143.11c0-2.75-11.27-15.18,0-23.13,11.3,8,0,20.38,0,23.13H-187Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg className={style.greenFlowerSix} viewBox="0 0 52.45 55.83">
          <path
            d="M-189.11,144c-1.94-1.94-2.71-18.65-16.38-16.33-2.37,13.62,14.39,14.43,16.33,16.38Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg className={style.greenFlowerFive} viewBox="0 0 52.45 55.83">
          <path
            d="M-190,146.18c-2.75,0-15.1-11.27-23.13,0,8,11.3,20.38,0,23.13,0v-0.06Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg className={style.greenFlowerFour} viewBox="0 0 52.45 55.83">
          <path
            d="M-189.15,148.38c-1.95,1.94-18.65,2.71-16.33,16.38,13.62,2.37,14.43-14.39,16.38-16.33Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg className={style.greenFlowerThree} viewBox="0 0 52.45 55.83">
          <path
            d="M-184.77,148.42c1.94,1.95,2.71,18.65,16.38,16.33,2.37-13.62-14.39-14.43-16.33-16.38Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg className={style.greenFlowerTwo} viewBox="0 0 52.45 55.83">
          <path
            d="M-183.84,146.24c2.75,0,15.1,11.27,23.13,0-8-11.3-20.38,0-23.13,0v0.06Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg
          className={style.greenFlowerOne}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52.45 55.83"
        >
          <path
            d="M-184.73,144c1.94-1.94,18.65-2.71,16.33-16.38C-182,125.3-182.83,142.05-184.77,144Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <svg
          className={style.greenFlowerDrop}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52.45 55.83"
        >
          <path
            d="M-187,153.13c0,2.65-7.28,11.81-4.55,19.5a4.76,4.76,0,0,0,4.59,3.19,4.76,4.76,0,0,0,4.59-3.19c2.73-7.68-4.55-16.84-4.55-19.5H-187Z"
            transform="translate(213.17 -119.98)"
          />
        </svg>
        <span>Загрузка</span>
      </div>
    </>
  );
};
