import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useLayoutStyles } from './layout.styles';

function useCol({ className, ...props }) {
  const breakpoints = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const classes = useLayoutStyles({ theme: { ...props } });
  const spans = [];
  const classMap = {
    lg: classes.colLG,
    md: classes.colMD,
    sm: classes.colSM,
    xl: classes.colXL,
    xs: classes.colXS,
    xxl: classes.colXXL
  };
  breakpoints.forEach((brkPoint) => {
    const span = props[brkPoint];

    if (brkPoint === 'xs' && span === true) return;
    if (span) {
      spans.push(classMap[brkPoint]);
    }
  });
  const filterProps = { ...props };
  for (const key of breakpoints) {
    delete filterProps[key];
  }
  const cols = spans.length ? clsx(spans) : classes.col;
  return [{ ...filterProps, className: clsx(cols, className) }, { spans }];
}

export const Col = (props) => {
  const [{ ...colProps }, { spans }] = useCol(props);
  return <div {...colProps} />;
};

const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto'])
]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize
  })
]);

Col.displayName = 'Col';
Col.defaultProps = {
  lg: false,
  md: false,
  sm: false,
  xl: false,
  xs: false,
  xxl: false
};
Col.propTypes = {
  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  lg: column,

  /**
   * The number of columns to span on medium devices (≥768px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  md: column,

  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  sm: column,

  /**
   * The number of columns to span on extra large devices (≥1200px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xl: column,

  /**
   * The number of columns to span on extra small devices (<576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xs: column,

  /**
   * The number of columns to span on extra extra large devices (≥1400px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xxl: column
};
