import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import './index.css';

const Button = ({
  as: Component = 'button',
  href,
  rel,
  target,
  className,
  dark,
  accent,
  label,
  icon = 'arrowRight',
  ...rest
}) => (
  <Component
    href={href}
    rel={rel || (target === '_blank' ? 'noopener noreferrer' : null)}
    target={target}
    className={classNames('button', className, {
      'button--dark': dark,
      'button--accent': accent
    })}
    aria-label={label}
    {...rest}
  >
    <span>{label}</span>
    {icon && <Icon icon={icon} />}
  </Component>
);

export default Button;
