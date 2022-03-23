import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toSentenceCase } from '../../utils/utility';
import { useFormStyles } from './formComponents.styles';

export const PasswordInputField = ({
  changeCallback,
  blurCallback,
  label,
  name,
  width,
  ...rest
}) => {
  const classes = useFormStyles({ width });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {label && (
        <label htmlFor={name} className={classes.labelStyle}>
          {toSentenceCase(label)}
        </label>
      )}
      <div className={classes.passwordInputStyle}>
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={changeCallback}
          onBlur={blurCallback}
          className={classes.passwordInnerField}
          name={name}
          {...rest}
        />
        <i
          onClick={() => setShowPassword(!showPassword)}
          className={classes.togglePasswordIcon}
          aria-label='toggle password visibility'
          role='button'
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </i>
      </div>
    </>
  );
};

PasswordInputField.propTypes = {
  blurCallback: PropTypes.func,
  changeCallback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

PasswordInputField.defaultProps = { blurCallback: () => {} };
