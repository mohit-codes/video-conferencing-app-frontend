import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useLayoutStyles } from './layout.styles';

export const Container = ({ fluid, className, ...props }) => {
  const classes = useLayoutStyles();
  let containerClass = classes.container;
  const classMap = {
    lg: classes.containerLG,
    md: classes.containerMD,
    sm: classes.containerSM,
    xl: classes.containerXL
  };
  if (fluid) {
    if (typeof fluid === 'string') {
      containerClass = classMap[fluid] ?? classes.containerFluid;
    } else {
      containerClass = classes.containerFluid;
    }
  }
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return <div {...props} className={clsx(containerClass, className)} />;
};

Container.displayName = 'Container';
Container.propTypes = {
  /**
   * Allow the Container to fill all of its available horizontal space.
   * true - full width on all sizes
   * sm - full width on sm and smaller sizes
   * .... so on
   * @type {(true|"sm"|"md"|"lg"|"xl"|"xxl")}
   */
  fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
Container.defaultProps = {
  fluid: false
};
