import { createUseStyles } from 'react-jss';

export const useSpinnerStyles = createUseStyles((theme) => ({
  spinner: {
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationName: 'spin',
    animationTimingFunction: 'linear',
    color: theme.btnPrimaryColor
  }
}));
