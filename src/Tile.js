import React, { Component } from 'react';
import styled from 'styled-components'




class Tile extends Component {
  constructor(props){
    super(props)
  }

  render(props) {

    const {coords, tileType} = this.props

    return (
      <div>
        {coords}
      </div>
    );
  }
}

export default Tile;
