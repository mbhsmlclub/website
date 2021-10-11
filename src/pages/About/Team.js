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
      <div>
      <a href='https://github.com/Qwerty71'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={AreebIMG} alt="Areeb Gani" width='450' height='450'/>
        </Tilt>
      </a>
      <a className="member__name" href='https://github.com/Qwerty71'>
          Areeb gani
      </a>
      </div>
      <div>
      <a href='https://mci.sh/'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={MichaelIMG} alt="Michael Ilie" width='450' height='450'/>
        </Tilt>
      </a>
      <a className="member__name" href='https://mci.sh/'>
          Michael Ilie
      </a>
      </div>
      <div>
      <a href='https://www.vijayrs.com/'>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} tiltMaxAngleX={5} tiltMaxAngleY={5} glareColor="#ffffff" glarePosition="bottom">
          <img src={VijayIMG} alt="Vijay Shanmugam" width='450' height='450'/>
        </Tilt>
      </a>
      <a className="member__name" href='https://www.vijayrs.com/'>
          Vijay Shanmugam
      </a>
      </div>
    </div>
    </Fragment>
  );
}

export default memo(Team);
