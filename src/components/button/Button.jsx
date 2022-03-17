import { useButtonStyles } from './Button.styles';

export const Button = ({
  children,
  clickCallback,
  bgColor,
  border,
  textColor,
  margin,
  width,
  ...rest
}) => {
  /*
  Button Component stye props

  width - unit in rem (default value 100%)
  bgColor - button background color (default value primary global button theme)
  border - default value none
  textColor - default value white
  margin - default value 0
  */

  const classes = useButtonStyles({ bgColor, border, margin, textColor, width });
  return (
    <button className={classes.button} onClick={clickCallback} {...rest}>
      {children}
    </button>
  );
};
