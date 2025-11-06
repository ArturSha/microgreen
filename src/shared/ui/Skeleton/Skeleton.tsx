import classNames from 'classnames';
import style from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = ({
  width = '100%',
  height,
  borderRadius = '4px',
  className,
}: SkeletonProps) => {
  return (
    <div
      className={classNames(style.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};
