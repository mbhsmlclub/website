import React from 'react';
import classNames from 'classnames';
import { useAppContext } from 'hooks';
import './NavToggle.css';

const NavToggle = ({ dark, menuOpen, ...rest }) => {
  const { dispatch } = useAppContext();
  const onClick = () => dispatch({ type: 'toggleMenu' });

  return (
    <button
      className={classNames('nav-toggle', {
        'nav-toggle--dark': dark,
        'nav-toggle--open': menuOpen
      })}
      onClick={onClick}
      {...rest}
    >
      <div className="line"></div>
    </button>
  );
};

export default NavToggle;
