import React, { memo } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Label, Title, Title2, Paragraph } from 'components/Type';
import Button from 'components/Button';
import { useScrollRestore } from 'hooks';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './index.css';

const Hero = ({
  className,
  dark,
  accent,
  center,
  id,
  sectionRef,
  visible = !prerender,
  label,
  title,
  title2,
  paragraph,
  button,
  children,
  ...rest
}) => {
  const titleId = id && `${id}-title`;
  useScrollRestore();

  const MetaWrapper = ({ children }) => center
    ? <div>{children}</div>
    : children;

  return (
    <section
      className={classNames('hero', className, {
        'hero--dark': dark,
        'hero--accent': accent
      })}
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition
        appear={visible}
        in={visible}
        timeout={3000}
        onEnter={reflow}
      >
        {status => (
          <div className={classNames('hero__container', `hero__container--${status}`)}>
            <div className={classNames('hero__content', { 'hero__content--center': center })}>
              <MetaWrapper>
                {label && <Label>{label}</Label>}
                {title && <Title id={titleId} dark={dark}>{title}</Title>}
                {title2 && <Title2 id={titleId} dark={dark}>{title2}</Title2>}
                {paragraph && <Paragraph dark={dark}>{paragraph}</Paragraph>}
              </MetaWrapper>
              {button && <Button as="a" dark={dark} {...button} />}
              {children}
            </div>
          </div>
        )}
      </Transition>
    </section>
  );
};

export default memo(Hero);
