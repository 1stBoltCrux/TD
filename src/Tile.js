import React, { Component } from 'react';



class Tile extends Component {
  constructor(props){
    super(props)
  }

  render(props) {
    const {coords, tileType} = this.props

    return (
      <div className="Tile">
        {tileType}
      </div>
    );
  }
}

export default Tile;
