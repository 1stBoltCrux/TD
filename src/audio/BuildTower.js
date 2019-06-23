import React, { Component } from 'react';
import Sound from 'react-sound';
import buildTower from './build-tower.mp3'

const BuildTower = () => {

      return(
        <Sound
          url={buildTower}
          playStatus={Sound.status.PLAYING}
        />
      )
}

export default BuildTower;
