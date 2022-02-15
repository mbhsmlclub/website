import React, { memo } from 'react';
import classNames from 'classnames';
import { Paragraph } from 'components/Type';
import { Link } from 'components/Link';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Hero from 'pages/Hero';
import './Panel.css';

const Panel = ({
  alternate,
  label = 'Curriculum',
  title = 'Latest Lectures',
  alternateTitle = 'All Lectures',
  altText = 'There aren\'t any lectures available.',
  lectures,
  ...rest
}) => {
  console.log(lectures);
  return (

    <Hero
      className={classNames('panel', { 'panel--alternate': alternate })}
      label={!alternate && label}
      title2={(!alternate && title) || alternateTitle}
      {...rest}
    >
      <div className={classNames('panel__lectures', { 'panel__lectures--alternate': alternate })}>
        {lectures === false && <Paragraph>An error occured while fetching lectures.</Paragraph>}
        {(!lectures && lectures !== false) && <Paragraph>Coming Soon...</Paragraph>}
        {lectures?.length === 0 && <Paragraph>{altText}</Paragraph>}
      </div>
      {alternate  && lectures?.length > 0 && lectures?.reverse().map(({ lectureNum, slug, title, description }) => (
          <Link
            key={slug}
            className="panel__lecture"
            to={`/lectures/${slug}`}
            aria-label={title}
          >
            <h4 className="panel__lecture-name">
              <span>{title}</span>
              <div></div>
            </h4>
            <p className="panel__lecture-info">
              {description.substring(0, 200)}{description.length > 200 && '...'}
            </p>
            <Icon icon="plus" />
          </Link>
        ))}
      {!alternate && lectures?.length > 0 && lectures?.slice(0, 3).map(({ lectureNum, slug, title, description }) => (
          <Link
            key={slug}
            className="panel__lecture"
            to={`/lectures/${slug}`}
            aria-label={title}
          >
            <h4 className="panel__lecture-name">
              <span>{title}</span>
              <div></div>
            </h4>
            <p className="panel__lecture-info">
              {description.substring(0, 200)}{description.length > 200 && '...'}
            </p>
            <Icon icon="plus" />
          </Link>
        ))}
      {!alternate && <Button as={Link} to="/lectures" label="All Lectures" />}
    </Hero>
  );
};

export default memo(Panel);
