import React, { createContext, lazy, useEffect, useState, useRef, Suspense, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from 'components/PageLayout';
import Hero from 'pages/Hero';
import GetStarted from 'pages/GetStarted';
import Panel from './Panel';
import { useScrollRestore } from 'hooks';
import fetchLectures from 'lectures';
import Lecture from './Lecture';


const NotFound = lazy(() => import('pages/NotFound'));

const LectureContext = createContext({});


function Lectures(props) {
  const { id, title, description, sectionRef, visible, ...rest } = props;

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const grabLectures = async () => {
      const lectureData = await Promise.all(fetchLectures);
      setLectures(lectureData);
    };

    grabLectures();
  }, []);

  if (!sectionRef) return (
    <Suspense fallback={<Fragment />}>
      <Switch>
      {lectures?.map(({ slug, ...rest }) => (
              <Route
                exact
                key={slug}
                path={`/lectures/${slug}`}
                render={() => <Lecture slug={slug} {...rest} />}
              />
            ))}
        <Route exact path="/lectures" component={LecturesList} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );

  return (
    <Panel
      id={id}
      name={title}
      titleid={title}
      sectionRef={sectionRef}
      visible={visible}
      lectures={lectures}
      {...rest}
    />
  );
}

function LecturesList() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const grabLectures = async () => {
      const lectureData = await Promise.all(fetchLectures);
      setLectures(lectureData);
    };

    grabLectures();
  }, []);
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
        <LectureContext.Provider value={{ lectures }}>
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
        </LectureContext.Provider>
      </PageLayout>
    </Fragment>
  );
}

export default Lectures;
