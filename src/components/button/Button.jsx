import clsx from 'clsx';
import { useButtonStyles } from './button.styles';

export const Button = ({ children }) => {
  const classes = useButtonStyles();
  /**
   * you can use clsx package to use multiple classnames.
   */
  return (
    <button className={clsx(classes.button, 1 + 11 ? classes.btnDisabled : classes.btnEnabled)}>
      {children}
    </button>
  );
};
