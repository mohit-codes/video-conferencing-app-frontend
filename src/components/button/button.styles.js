import { createUseStyles } from 'react-jss';
import { globalTheme } from '../../theme';

export const useButtonStyles = createUseStyles((theme) => ({
  button: {
    '&:hover': {
      border: '2px solid black',
      cursor: 'pointer'
    },
    // using dynamic theme
    background: theme.btnBGColor,
    border: 'none',
    borderRadius: '30px',
    color: 'white',
    // using global theme
    fontFamily: globalTheme.fontFamily,
    fontWeight: 'bolder',
    height: '50px',
    marginBlock: '300px',
    marginInline: '45%',
    textAlign: 'center',
    width: '200px'
  }
}));
