import React from 'react';
import classNames from 'classnames';
import './index.css';

export const Label = ({ className, loading, children, ...rest }) => (
  <label className={classNames('label', className, { 'loading': loading })} {...rest}>
    {children}
  </label>
);

export const Title = ({ className, dark, loading, children, ...rest }) => (
  <h1
    className={classNames('title', className, {
      'title--dark': dark,
      'loading': loading
    })}
    {...rest}
  >
    {children}
  </h1>
);

export const Title2 = ({ className, dark, loading, children, ...rest }) => (
  <h2
    className={classNames('title2', className, {
      'title2--dark': dark,
      'loading': loading
    })}
    {...rest}
  >
    {children}
  </h2>
);

export const Paragraph = ({ className, dark, loading, children, ...rest }) => (
  <p
    className={classNames('paragraph', className, {
      'paragraph--dark': dark,
      'loading': loading
    })}
    {...rest}
  >
    {children}
  </p>
);
