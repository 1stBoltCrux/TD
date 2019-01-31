import React, { Component } from 'react';
import Sound from 'react-sound';
import explosionSound from './explosion.mp3'

const ExplosionSound = () => {

      return(
        <Sound
          url={explosionSound}
          playStatus={Sound.status.PLAYING}
        />
      )
}

export default ExplosionSound;
