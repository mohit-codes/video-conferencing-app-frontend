import { ImSpinner9 } from 'react-icons/im';
import { useSpinnerStyles } from './Spinner.styles';

export const Spinner = ({ size }) => {
  const { spinner } = useSpinnerStyles();
  return <ImSpinner9 className={spinner} size={size} />;
};
