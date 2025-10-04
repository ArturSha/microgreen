import { Description, DialogPanel, DialogTitle, Dialog as HeadlessDialog } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import style from './Dialog.module.css';

interface DialogProps {
  isOpen: boolean;
  title?: ReactNode;
  subtitle?: string | ReactNode;
  maxWidth?: string;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  closeButton?: boolean;
  panelClassName?: string;
  errorText?: string | null;
}

export const Dialog = (props: DialogProps) => {
  const {
    title,
    isOpen,
    subtitle,
    children,
    onClose = () => {},
    className,
    maxWidth,
    isLoading,
    closeButton,
    errorText,
    panelClassName,
  } = props;

  return (
    <HeadlessDialog
      open={isOpen}
      onClose={() => {
        if (!isLoading) {
          onClose();
        }
      }}
      className={style.container}
    >
      <div className={style.backdrop}>
        <DialogPanel
          className={classNames(style.panel, panelClassName)}
          style={{ maxWidth: `${maxWidth}` }}
        >
          {title && <DialogTitle className={style.title}>{title}</DialogTitle>}
          {subtitle && <Description className={style.subtitle}>{subtitle}</Description>}

          {closeButton && (
            <Button
              className={style.closeBtn}
              variant="clear"
              onClick={() => onClose()}
              disabled={isLoading}
            >
              &times;
            </Button>
          )}
          {errorText && (
            <Text variant="error" className={style.error}>
              {errorText}
            </Text>
          )}
          <div className={classNames(style.actions, className)}>{children}</div>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
};
