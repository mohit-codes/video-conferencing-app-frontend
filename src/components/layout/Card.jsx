import { useLayoutStyles } from './layout.styles';

export const Card = (props) => {
  const classes = useLayoutStyles();
  return <div {...props} className={classes.card} />;
};
