import { createUseStyles } from 'react-jss';
import { globalTheme } from '../../theme';

export const useButtonStyles = createUseStyles((theme) => ({
  button: {
    '&:disabled': {
      '&:hover': {
        cursor: 'not-allowed'
      },

      background: theme.btnDisabledColor,
      cursor: 'not-allowed'
    },

    '&:hover': {
      boxShadow: '0 4px 12px 2px rgb(0 0 0 / 25%)',
      cursor: 'pointer'
    },

    background: (props) => (props?.bgColor ? props.bgColor : theme.btnPrimaryColor),
    border: (props) => (props?.border ? props.border : 'none'),
    borderRadius: '0.3rem',
    color: (props) => (props?.textColor ? props.textColor : 'white'),
    fontFamily: globalTheme.fontFamily,
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: (props) => (props?.margin ? props.margin : '0'),
    padding: '0.7rem 0',
    width: (props) => (props?.width ? props.width : '100%')
  }
}));
