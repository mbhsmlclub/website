import React, { Fragment, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from 'pages/Hero';
import { Link } from 'components/Link';
import { Label, Title2, Paragraph } from 'components/Type';
import { useScrollRestore } from 'hooks';
import './PostList.css';

const PostList = ({ posts }) => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title="Blog - Project Modern"
        meta={[{
          name: "description",
          content: "The official blog of the Project Modern community and format.",
        }]}
      />
      <Hero
        label="Blog"
        title="Recent News and Updates"
      />
      {posts?.length > 0 &&
        <div className="post-list">
          {posts?.map(({
            slug,
            banner,
            bannerVideo,
            bannerPlaceholder,
            bannerAlt,
            title,
            date,
            description,
            ...rest
          }) => (
            <article className="post-list__item">
              <Link className="post-list__content" to={`/blog/${slug}`}>
                <div className="post__text">
                  <Label className="post__date">
                    {new Date(date).toLocaleDateString('default', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </Label>
                  <Title2>{title}</Title2>
                  <Paragraph>{description}</Paragraph>
                </div>
              </Link>
            </article>
          ))}
        </div>
      }
    </Fragment>
  );
};

export default memo(PostList);
