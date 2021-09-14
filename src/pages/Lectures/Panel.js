import React, { memo } from 'react';
import classNames from 'classnames';
import { Paragraph } from 'components/Type';
import { Link } from 'components/Link';
import Button from 'components/Button';
import Hero from 'pages/Hero';
import './Panel.css';

const Panel = ({
  alternate,
  label = 'Curriculum',
  title = 'Latest Lectures',
  altText = 'There aren\'t any lectures available.',
  lectures,
  ...rest
}) => {
  return (
    <Hero
      className={classNames('panel', { 'panel--alternate': alternate })}
      label={!alternate && label}
      title2={title}
      {...rest}
    >
      <div className={classNames('panel__lectures', { 'panel__lectures--alternate': alternate })}>
        {lectures === false && <Paragraph>An error occured while fetching lectures.</Paragraph>}
        {(!lectures && lectures !== false) && <Paragraph>Coming Soon...</Paragraph>}
        {lectures?.length === 0 && <Paragraph>{altText}</Paragraph>}
      </div>
      {!alternate && <Button as={Link} to="/lectures" label="All Lectures" />}
    </Hero>
  );
};

export default memo(Panel);
