import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import { socials } from 'data/nav';
import './index.css';

const Socials = ({ className, dark, ...rest }) => (
  <div className={classNames('socials', className, { 'socials--dark': dark })} {...rest}>
    {socials?.map(({ label, href, icon }) => (
      <a
        className="socials__link"
        key={label}
        aria-label={label}
        target="_blank"
        rel="noreferrer noopener"
        href={href}
      >
        <Icon icon={icon} />
      </a>
    ))}
  </div>
);

export default Socials;
