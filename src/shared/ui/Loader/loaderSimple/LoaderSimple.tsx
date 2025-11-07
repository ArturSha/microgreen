import classNames from 'classnames';
import style from './LoaderSimple.module.css';

interface LoaderSimpleProps {
  className?: string;
}

export const LoaderSimple = ({ className }: LoaderSimpleProps) => {
  return (
    <div className={style.loaderContainer}>
      <div className={classNames(style.loading, className)}></div>
    </div>
  );
};
