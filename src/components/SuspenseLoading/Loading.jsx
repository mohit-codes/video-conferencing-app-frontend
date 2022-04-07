import { Spinner } from '../Spinner';
import { useLoadingStyles } from './Loading.styles';

export const Loading = () => {
  const { container, text } = useLoadingStyles();
  return (
    <div className={container}>
      <Spinner size='2rem' />
      <h1 className={text}>Loading...</h1>
    </div>
  );
};
