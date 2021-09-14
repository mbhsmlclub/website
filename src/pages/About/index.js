import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from 'components/PageLayout';
import Hero from 'pages/Hero';
import Mission from './Mission';
import Lectures from 'pages/Lectures';
import Team from './Team';
import GetStarted from 'pages/GetStarted';
import { useAppContext, useScrollRestore } from 'hooks';

function About() {
  const { events } = useAppContext();
  const eventsData = events && events
    ?.filter(({ closed }) => closed)
    .sort((a, b) => parseInt(b?.time) - parseInt(a?.time));
  if (eventsData) eventsData.length = 5;
  const [visibleSections, setVisibleSections] = useState([]);
  const mission = useRef();
  const eventsList = useRef();
  const team = useRef();
  const getStarted = useRef();
  useScrollRestore();

  useEffect(() => {
    const revealSections = [mission, team, getStarted];

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
        title="About Us - MBHS ML Club"
      />
      <PageLayout>
        <Hero
          label="About Us"
          title="MBHS Machine Learning Club"
        />
        <Mission
          id="mission"
          sectionRef={mission}
          visible={visibleSections.includes(mission.current)}
        />
        <Team
          id="team"
          sectionRef={team}
          visible={visibleSections.includes(team.current)}
        />
        <GetStarted
          accent
          id="get-started"
          sectionRef={getStarted}
          visible={visibleSections.includes(getStarted.current)}
        />
      </PageLayout>
    </Fragment>
  );
}

export default About;
