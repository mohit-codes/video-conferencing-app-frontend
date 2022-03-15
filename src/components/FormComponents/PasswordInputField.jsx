import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useFormStyles } from './FormComponents.styles';

export const PasswordInputField = ({ value, callback, name, placeholder, width }) => {
  const classes = useFormStyles({ width });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <label htmlFor={name} className={classes.labelStyle}>
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <div className={classes.passwordInputStyle}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          value={value}
          onChange={callback}
          placeholder={placeholder}
          className={classes.passwordInnerField}
        />
        <i
          onClick={() => setShowPassword(!showPassword)}
          className={classes.togglePasswordIcon}
          aria-label='toggle password visibility'
          role='button'
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </i>
      </div>
    </>
  );
};

PasswordInputField.propTypes = {
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default PasswordInputField;
