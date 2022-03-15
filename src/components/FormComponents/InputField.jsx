import PropTypes from 'prop-types';
import { useFormStyles } from './FormComponents.styles';

export const InputField = ({ type, value, callback, name, hasLabel, placeholder, width }) => {
  const classes = useFormStyles({ width });
  return (
    <>
      {hasLabel && (
        <label htmlFor={name} className={classes.labelStyle}>
          {name[0].toUpperCase() + name.slice(1)}
        </label>
      )}
      <input
        type={type}
        id={name}
        value={value}
        onChange={callback}
        placeholder={placeholder}
        className={classes.inputStyle}
      />
    </>
  );
};

InputField.propTypes = {
  callback: PropTypes.func.isRequired,
  hasLabel: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
