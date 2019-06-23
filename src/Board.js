import React, { Component } from 'react';
import Tile from './Tile'
import styled from 'styled-components'
import uuid from 'uuid'
import pathTileOne from './images/path-tile-1.svg'
import grass from './images/grass.jpeg'

const BoardContainer = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: 5px -1px 25px 2px rgba(0, 0, 0, 0.26);
`

const Block = styled.div`
justify-content: center;
display: flex;
align-items: center;
font-size: .5em;
width: 35px;
height: 35px;
 background: ${props => props.tileType === 0 ? `url(${grass})` : 'gray'};
background-image: ${props => props.tileType >= 1 ? `url(${pathTileOne})` : 'transparent'};
background-size: cover;
`

const Row = styled.div`
  display: flex;
`

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.enemyPositions.length !== nextProps.enemyPositions.length) {
      return true
    } else {
      return false
    }
  }




  currentMap = () => this.props.currentBoard.map((row, i) => {

    const whichRow = i;
    return (
      <Row key={uuid()}>
        {row.map((tile, j) => {
          const whichTile = j;
          const coords = [whichRow, whichTile]
          const whichTower = `${whichRow}-${whichTile}`
          return (
            <Block key={uuid()} tileType={tile}>
              <Tile
                passOverlayToTile={this.props.passOverlayToTile}
                makeTower={this.props.makeTower}
                towers={this.props.towers}
                key={uuid()}
                whichTower={whichTower}
                coords={coords}
                tileType={tile}
              />
            </Block>
          )
        })}
      </Row>
    )
  })

  render() {
    console.log('board re-render');
    return (
      <div>
        <BoardContainer>
          {this.currentMap()}
        </BoardContainer>
      </div>
    );
  }
}

export default Board;
