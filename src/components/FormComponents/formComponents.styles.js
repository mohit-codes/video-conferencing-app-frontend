import { createUseStyles } from 'react-jss';

export const useFormStyles = createUseStyles({
  inputStyle: {
    border: '2px solid',
    borderRadius: '0.3rem',
    marginBottom: '0.3rem',
    padding: '0.5rem 0.3rem',
    position: 'relative',
    width: (props) => (props?.width ? props.width : '100%')
  },

  labelStyle: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: 'normal',
    marginBottom: '0.4rem',
    marginTop: '10px'
  },

  passwordInnerField: {
    border: 'none',
    outline: 'none',
    width: '100%'
  },

  passwordInputStyle: {
    border: '2px solid',
    borderRadius: '0.3rem',
    marginBottom: '0.9rem',
    padding: '0.3rem 0.3rem 0.4rem',
    position: 'relative',
    width: (props) => (props?.width ? props.width : '100%')
  },

  togglePasswordIcon: {
    bottom: '2px',
    fontSize: '1.3rem',
    position: 'absolute',
    right: '10px'
  }
});
