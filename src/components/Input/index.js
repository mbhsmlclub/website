import React from 'react';
import TextArea from './TextArea';
import './index.css';

const Input = ({ textarea, children, ...rest }) => textarea
  ? <TextArea className="input input--textarea" {...rest}>{children}</TextArea>
  : <input className="input" {...rest}>{children}</input>;

export default Input;
