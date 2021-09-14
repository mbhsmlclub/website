import React, { memo } from 'react';
import classNames from 'classnames';
import Hero from 'pages/Hero';
import { Paragraph } from 'components/Type';
import Anchor from 'components/Anchor';
import './Mission.css';

const Mission = ({ alternate, ...rest }) => (
  <Hero
    className={classNames('mission', { 'mission--alternate': alternate })}
    label="Our Mission"
    title2="Spark curiosity for Machine Learning"
    {...rest}
  >
    <Paragraph>Over the last decade, it's become clear that artificial intelligence will radically change the ways humanity interacts with technology. From <Anchor href="https://waymo.com/" target="_blank">autonomous vehicles</Anchor> to <Anchor href='https://openai.com/blog/musenet/'>musical composition</Anchor>, deep learning impacts every facet of human existence. For this reason, it's crucial that students are prepared to understand & navigate the rapidly transforming future.</Paragraph>
    <Paragraph>Montgomery Blair's Machine Learning Club is a welcoming, vibrant, and collaborative community dedicated to fostering an interest in Machine Learning among its members. We break down cutting edge ML research into weekly lectures that are understable for members with varying levels of experience.</Paragraph>
  </Hero>
);

export default memo(Mission);
