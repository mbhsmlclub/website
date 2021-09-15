import React, { memo } from 'react';
import Hero from 'pages/Hero';
import { useAppContext } from 'hooks';
import './Intro.css';

function Intro(props) {
  const { dispatch } = useAppContext();
  const onClick = () => dispatch({ type: 'setRedirect', value: 'https://discord.gg/Usz9UXbQNy' });

  return (
    <Hero
      className="intro"
      dark
      label="Montgomery Blair High School"
      title="AI & Machine Learning Club"
      paragraph="Join us on Tuesdays at Lunch in Room 220 to get hands-on experience with Machine Learning."
      button={{
        href: "https://discord.gg/Usz9UXbQNy",
        label: 'Join Discord',
        onClick,
      }}
      {...props}
    />
  );
}

export default memo(Intro);
