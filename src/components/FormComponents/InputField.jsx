import PropTypes from 'prop-types';
import { useFormStyles } from './FormComponents.styles';
import { toSentenceCase } from '../../utils/utility';

export const InputField = ({ changeCallback, blurCallback, id, hasLabel, width, ...rest }) => {
  const classes = useFormStyles({ width });
  return (
    <>
      {hasLabel && (
        <label htmlFor={id} className={classes.labelStyle}>
          {toSentenceCase(id)}
        </label>
      )}
      <input
        id={id}
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
  hasLabel: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};
