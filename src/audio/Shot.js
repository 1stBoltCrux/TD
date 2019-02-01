import React, { Component } from 'react';
import Sound from 'react-sound';
import shot from './shot.mp3'

const Shot = () => {

      return(
        <Sound
          url={shot}
          playStatus={Sound.status.PLAYING}
        />
      )
}

export default Shot;
