import React, { useState, memo } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { Link, NavLink } from 'components/Link';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import Anchor from 'components/Anchor';
import Socials from 'components/Socials';
import { media } from 'utils/style';
import { useAppContext, useWindowSize } from 'hooks';
import { reflow } from 'utils/transition';
import { navLinks } from 'data/nav';
import './index.css';

const Header = ({ dark }) => {
  const { menuOpen, dispatch } = useAppContext();
  const [hashKey, setHashKey] = useState();
  const location = useLocation();
  const { width } = useWindowSize();
  const isMobile = width <= media.mobile;
  const isDark = menuOpen ? !dark : dark;

  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <header className={classNames('header', { 'header--dark': isDark })} role="banner">
      <Link
        className="header__logo"
        to={{ pathname: '/', hash: '#intro' }}
        aria-label="MBHS ML Club"
      >
        <Icon icon="logo" />
      </Link>
      <div className="header__nav">
        <a
          className="header__cta"
          href='https://discord.gg/Usz9UXbQNy'
        >
          Join Discord
        </a>
        <NavToggle dark={isDark} menuOpen={menuOpen} />
      </div>
      <Transition
        in={menuOpen}
        timeout={4000}
        onEnter={reflow}
      >
        {status => (
          <menu className={classNames('header__menu', { 'header__menu--open': menuOpen })}>
            <div className="header__menu-content">
              <div className="header__content-wrapper">
                <nav className="header__primary-nav">
                  <label className="header__nav-label">Menu</label>
                  <menu className="header__nav-menu">
                    {navLinks?.map(({ label, pathname, hash }, index) => (
                      <NavLink
                        exact
                        className="header__nav-item"
                        isActive={match => isMatch({ match, hash })}
                        onClick={handleNavClick}
                        key={label}
                        to={{ pathname, hash, state: hashKey }}
                        aria-label={label}
                      >
                        <h4>{label}</h4>
                        <label>{label}</label>
                        <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                      </NavLink>
                    ))}
                  </menu>
                </nav>
                <div className="header__nav-info">
                  <Anchor
                    href="mailto:mbhsmlclub@gmail.com"
                    style={{ marginBottom: '6px' }}
                  >
                    mbhsmlclub@gmail.com
                  </Anchor>
                  <Anchor
                    href="https://discord.gg/Usz9UXbQNy"
                    target="_blank"
                    style={{ marginBottom: '6px' }}
                  >
                    https://discord.gg/Usz9UXbQNy
                  </Anchor>
                  <h4>&copy; {new Date().getFullYear()} MBHS ML Club</h4>
                  {!isMobile && <Socials className="header__socials" dark={isDark} />}
                </div>
              </div>
            </div>
          </menu>
        )}
      </Transition>
    </header>
  );
};

export default memo(Header);
