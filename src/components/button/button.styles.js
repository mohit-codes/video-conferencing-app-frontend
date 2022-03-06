import { createUseStyles } from 'react-jss';
import { globalTheme } from '../../theme';

export const useButtonStyles = createUseStyles((theme) => ({
  button: {
    background: theme.btnBGColor,
    borderRadius: '30px',
    fontFamily: globalTheme.fontFamily
  }
}));
