import React, { memo, Fragment } from 'react';
import Tilt from 'react-parallax-tilt';
import Hero from 'pages/Hero';
import AreebIMG from '../../assets/areeb.jpg';
import MichaelIMG from '../../assets/michael.png';
import VijayIMG from '../../assets/vijay.jpg';
import './Team.css'

function Team(props) {
  return (
    <Fragment>
    <Hero
      center
      label="Meet The Team"
      title="Captains"
      {...props}
    />
    <div className='captainPhotos'>
      <a href='https://github.com/Qwerty71'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={AreebIMG} alt="Picture of Areeb Gani" width='450' height='450'/>
        </Tilt>
      </a>
      <a href='https://mci.sh/'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={MichaelIMG} alt="Picture of Michael Ilie" width='450' height='450'/>
        </Tilt>
      </a>
      <a href='https://www.vijayrs.ml/'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={VijayIMG} alt="Picture of Vijay Shanmugam" width='450' height='450'/>
        </Tilt>
      </a>
    </div>
    </Fragment>
  );
}

export default memo(Team);
