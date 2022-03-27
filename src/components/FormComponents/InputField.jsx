import PropTypes from 'prop-types';
import { toSentenceCase } from '../../utils/utility';
import { useFormStyles } from './formComponents.styles';

export const InputField = ({ changeCallback, blurCallback, name, label, width, ...rest }) => {
  const classes = useFormStyles({ width });
  return (
    <>
      {label && (
        <label htmlFor={name} className={classes.labelStyle}>
          {toSentenceCase(label)}
        </label>
      )}
      <input
        name={name}
        onChange={changeCallback}
        onBlur={blurCallback}
        className={classes.inputStyle}
        {...rest}
      />
    </>
  );
};

InputField.propTypes = {
  changeCallback: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};
InputField.defaultProps = {
  label: ''
};
