import clsx from 'clsx';
import { useLayoutStyles } from './layout.styles';

export const Card = ({ className, ...props }) => {
  const classes = useLayoutStyles();
  return <div {...props} className={clsx(classes.card, className)} />;
};
