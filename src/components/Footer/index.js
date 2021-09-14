import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Link } from 'components/Link';
import Icon from 'components/Icon';
import { Paragraph } from 'components/Type';
import Anchor from 'components/Anchor';
import Socials from 'components/Socials';
import { media } from 'utils/style';
import { useWindowSize } from 'hooks';
import { reflow } from 'utils/transition';
import { navLinks } from 'data/nav';
import './index.css';

function Footer() {
  const { width } = useWindowSize();
  const isMobile = width <= media.mobile;
  const [visible, setVisible] = useState();
  const footer = useRef();

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          observer.unobserve(section);

          return visible ? false : setVisible(true);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    sectionObserver.observe(footer.current);

    return function cleanUp() {
      sectionObserver.disconnect();
    };
  }, [visible]);

  return (
    <footer className="footer" ref={footer}>
      <Transition
        in={visible}
        timeout={4000}
        onEnter={reflow}
      >
        {status => (
          <div className={classNames('footer__content', `footer__content--${status}`)}>
            {!isMobile &&
              <div className="footer__left">
                <Link
                  to={{ pathname: '/', hash: '#intro' }}
                  aria-label="Fridays at Lunch in Room 220"
                >
                  <Icon icon="logo" />
                </Link>
                <Paragraph>Fridays at Lunch | Room 220</Paragraph>
                <h4>&copy; {new Date().getFullYear()} MBHS ML Club</h4>
                <Socials className="footer__socials" dark />
              </div>
            }
            <div className="footer__right">
              <label className="footer__label">We Can Help</label>
              <div className="footer__links">
                <Anchor href="mailto:mbhsmlclub@gmail.com">mbhsmlclub@gmail.com</Anchor>
                <Anchor href="https://discord.gg/Usz9UXbQNy" target="_blank">https://discord.gg/Usz9UXbQNy</Anchor>
              </div>
              <label className="footer__label">Sitemap</label>
              <ul className="footer__menu">
                {navLinks?.map(({ label, pathname, hash }) => (
                  <Link
                    key={label}
                    aria-label={label}
                    to={{ pathname, hash }}
                  >
                    {label}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </footer>
  );
}

export default Footer;
