import clsx from 'clsx';
import { useLayoutStyles } from './layout.styles';

export const Row = ({ className, center, ...props }) => {
  const classes = useLayoutStyles({ center });

  return <div {...props} className={clsx(classes.row, className)} />;
};
