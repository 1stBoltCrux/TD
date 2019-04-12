import React, { Component } from 'react';
import Tile from './Tile'
import Enemy from './enemies/Enemy';
import Tower from './towers/Tower'
import styled from 'styled-components'
import uuid from 'uuid'
import {TILE_H, TILE_W} from './config/movement/MovementVariables';
import pathTileOne from './images/path-tile-1.svg'
import grassTileOne from './images/grass-tile-1.png'
import grass from './images/grass.jpeg'


const BoardContainer = styled.div`
  position: relative;
  overflow: hidden;
`



const Block = styled.div`
justify-content: center;
display: flex;
align-items: center;
font-size: .5em;
width: 30px;
height: 30px;
 background: ${props => props.tileType === 0 ? `url(${grass})` : 'gray'};
background-image: ${props => props.tileType >= 1 ? `url(${pathTileOne})` : 'transparent' };
background-size: cover;
`

const Row = styled.div`
  display: flex;
`

class Board extends Component {
  constructor(props){
    super(props)

      this.state = {

      }
  }

  shouldComponentUpdate(nextProps){
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
           return(
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
