import React, { useState, useRef, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import { tokens } from 'app/theme';
import { MDXProvider } from '@mdx-js/react';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { Title, Title2, Paragraph } from 'components/Type';
import Anchor from 'components/Anchor';
import { Link } from 'components/Link';
import { useScrollRestore } from 'hooks';
import { msToNum } from 'utils/style';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './Post.css';

const PostWrapper = ({
  children,
  title,
  date,
  description,
  readTime,
  ...rest
}) => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title={`Blog | ${title}`}
        meta={[{
          name: "description",
          content: description,
        }]}
      />
      <article className="post" {...rest}>
        <header className="post__header">
          <div className="post__header-text">
            <Transition
              appear
              in={!prerender}
              timeout={msToNum(tokens.base.durationM)}
              onEnter={reflow}
            >
              {status => (
                <div className="post__date">
                  <span className={classNames('post__date-text', `post__date-text--${status}`)}>
                    {new Date(date).toLocaleDateString('default', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              )}
            </Transition>
            <Title aria-label={title}>
              {title.split(' ').map((word, index) => (
                <span className="post__title-word-wrapper" key={`${word}-${index}`}>
                  <span className="post__title-word" style={{ '--index': index }}>
                    {word}
                    {index !== title.split(' ').length - 1 ? '\u00a0' : ''}
                  </span>
                </span>
              ))}
            </Title>
          </div>
        </header>
        <div className="post__content-wrapper" id="PostContent">
          <div className="post__content">{!prerender && children}</div>
        </div>
      </article>
    </Fragment>
  );
};

const PostTitleTwo = ({ children, ...rest }) => (
  <Title2 className="post__title2" {...rest}>
    {children}
  </Title2>
);

const PostParagraph = ({ children, ...rest }) => (
  <Paragraph className="post__paragraph" {...rest}>
    {children}
  </Paragraph>
);

const ArticleImage = ({ src, alt, ...rest }) => {
  const [size, setSize] = useState();
  const imgRef = useRef();
  const imgSrc = src.startsWith('http') ? src : require(`posts/assets/${src}`);

  useEffect(() => {
    const { width, height } = imgRef.current;

    if (width && height) {
      setSize({ width, height });
    }
  }, []);

  const handleLoad = event => {
    const { width, height } = event.target;
    setSize({ width, height });
  };

  return (
    <img
      className="post__image"
      ref={imgRef}
      src={imgSrc}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
      alt={alt}
      width={size?.width}
      height={size?.height}
      {...rest}
    />
  );
};

function linkFactory({ href, ...props }) {
  if (!href.startsWith('http')) {
    return <Anchor as={Link} to={href} {...props} />;
  }

  return <Anchor href={href} target="_blank" rel="noreferrer noopener" {...props} />;
}

const Post = ({ slug, content: PostContent, ...rest }) => {
  return (
    <MDXProvider
      components={{
        wrapper: PostWrapper,
        h2: PostTitleTwo,
        p: PostParagraph,
        img: ArticleImage,
        a: linkFactory,
      }}
    >
      <PostContent slug={slug} {...rest} />
    </MDXProvider>
  );
};

export default Post;
