import React, { Fragment } from 'react';
import classNames from 'classnames';
import { MDXProvider } from '@mdx-js/react';
import GetStarted from 'pages/GetStarted';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { Title2, Paragraph } from 'components/Type';
import Anchor from 'components/Anchor';
import { Link } from 'components/Link';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import './Lecture.css';

const LectureWrapper = ({ 
  children,
  title,
  date,
  slides,
  notebook,
  code,
  ...rest 
}) => {
  return (
    <Fragment>
        <Fragment>
          <Helmet
            title={`${title} - MBHS ML Club`}
          />
          <Transition
              appear={!prerender}
              in={!prerender}
              timeout={3000}
              onEnter={reflow}
            >
              {status => (
                <section className="lecture__wrapper">
                  <header className={classNames('lecture__header', `lecture__header--${status}`)}>
                    <div className="lecture__panel">
                      <Title2>{title}</Title2>
                      <Paragraph>{children}</Paragraph>
                    </div>
                    <div className="lecture__panel">
                      <div>
                        <Paragraph className="lecture__tag">
                          <label>Date:</label>
                            {new Date(date).toLocaleDateString('default', {
                              year: 'numeric',
                              day: 'numeric',
                              month: 'long',
                            })}
                        </Paragraph>
                        <Paragraph className="lecture__tag">
                          <label>Slides:</label>
                            <Anchor target="_blank" rel="noreferrer noopener" href={slides}>
                              Google Slides
                            </Anchor>
                        </Paragraph>
                        <Paragraph className="lecture__tag">
                          <label>Repository:</label>
                            <Anchor target="_blank" rel="noreferrer noopener" href={code}>
                              Github
                            </Anchor
                            >
                        </Paragraph>
                        <Paragraph className="lecture__tag">
                          <label>Notebook:</label>
                            <Anchor target="_blank" rel="noreferrer noopener" href={notebook}>
                              Deepnote
                            </Anchor>
                        </Paragraph>
                      </div>
                      <div className="lecture__social">
                        <h4>Share</h4>
                          <Anchor target="_blank" rel="noreferrer noopener" href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check%20out%20${title}%20from%20@MbhsMl:`}>
                            Twitter
                          </Anchor>
                          <Anchor target="_blank" rel="noreferrer noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                            Facebook
                          </Anchor>
                          <Anchor target="_blank" rel="noreferrer noopener" href={`https://reddit.com/submit?url=${window.location.href}&title=${title}`}>
                            Reddit
                          </Anchor>
                          <Anchor target="_blank" rel="noreferrer noopener" href={`mailto:example@example.com?&subject=${title}&cc=&bcc=&body=${window.location.href}%0ACheck%20out%20${title}%20from%20MBHS%20ML%20Club:`}>
                            Email
                          </Anchor>
                      </div>
                    </div>
                  </header>
                </section>
              )}
            </Transition>
            <GetStarted
              accent
            />
        </Fragment>
    </Fragment>
  )
};

function linkFactory({ href, ...props }) {
  if (!href.startsWith('http')) {
    return <Anchor as={Link} to={href} {...props} />;
  }

  return <Anchor href={href} target="_blank" rel="noreferrer noopener" {...props} />;
}

const Lecture = ({ slug, content: LectureContent, ...rest }) => {
  return (
    <MDXProvider
      components={{
        wrapper: LectureWrapper,
        a: linkFactory,
      }}
    >
      <LectureContent slug={slug} {...rest} />
    </MDXProvider>
  );
};

export default Lecture;