import React, { lazy, useEffect, useState, useRef, Suspense, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from 'components/PageLayout';
import Hero from 'pages/Hero';
import GetStarted from 'pages/GetStarted';
import Panel from './Panel';
import { useAppContext, useScrollRestore } from 'hooks';
import prerender from 'utils/prerender';

const NotFound = lazy(() => import('pages/NotFound'));

function Lectures(props) {
  const { id, sectionRef, visible, ...rest } = props;
  const titleId = `${id}-title`;
  const { dispatch, lectures } = useAppContext();

  if (!sectionRef) return (
    <Suspense fallback={<Fragment />}>
      <Switch>
        <Route exact path="/lectures" component={LecturesList} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );

  return (
    <Panel
      id={id}
      titleId={titleId}
      sectionRef={sectionRef}
      visible={visible}
      lectures={lectures && lectures?.filter(({ closed }) => !closed)}
      {...rest}
    />
  );
}

function LecturesList() {
  const { lectures } = useAppContext();
  const [visibleSections, setVisibleSections] = useState([]);
  const lecturesList = useRef();
  const getStarted = useRef();
  useScrollRestore();

  useEffect(() => {
    const revealSections = [lecturesList, getStarted];

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          observer.unobserve(section);
          if (visibleSections.includes(section)) return;
          setVisibleSections(prevSections => [...prevSections, section]);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    return function cleanUp() {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <Fragment>
      <Helmet
        title="Lectures - MBHS ML Club"
      />
      <PageLayout>
        <Hero
          label="Lectures"
          title="New Lectures Every Week"
        />
        <Lectures
          alternate
          id="lectures"
          title=""
          lectures={lectures && lectures?.filter(({ closed }) => !closed)}
          sectionRef={lecturesList}
          visible={visibleSections.includes(lecturesList.current)}
        />
        <GetStarted
          id="get-started"
          sectionRef={getStarted}
          visible={visibleSections.includes(getStarted.current)}
        />
      </PageLayout>
    </Fragment>
  );
}

export default Lectures;
