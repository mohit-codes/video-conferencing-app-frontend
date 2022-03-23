import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toSentenceCase } from '../../utils/utility';
import { useFormStyles } from './formComponents.styles';

export const PasswordInputField = ({ changeCallback, blurCallback, id, width, ...rest }) => {
  const classes = useFormStyles({ width });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <label htmlFor={id} className={classes.labelStyle}>
        {toSentenceCase(id)}
      </label>
      <div className={classes.passwordInputStyle}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          onChange={changeCallback}
          onBlur={blurCallback}
          className={classes.passwordInnerField}
          {...rest}
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
  changeCallback: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default PasswordInputField;
