import clsx from 'clsx';

export const Row = ({ className, ...props }) => (
  <div {...props} className={clsx(classes.row, className)} />
);
