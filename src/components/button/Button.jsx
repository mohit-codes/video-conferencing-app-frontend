import { useButtonStyles } from './Button.styles';

export const Button = ({ children, callback, type, disabled = false, ...props }) => {
  /*
  Button Component stye props

  width - unit in rem (default value 100%)
  bgColor - button background color (default value primary global button theme)
  border - default value none
  textColor - default value white
  margin - default value 0
  */

  const classes = useButtonStyles(props);
  return (
    <button className={classes.button} type={type} onClick={callback} disabled={disabled}>
      {children}
    </button>
  );
};
