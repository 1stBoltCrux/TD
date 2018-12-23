import React, { Component } from 'react';
import Tile from './Tile'
import Enemy from './enemies/Enemy';
import Tower from './towers/Tower'
import styled from 'styled-components'
import uuid from 'uuid'
import {TILE_H, TILE_W} from './config/movement/MovementVariables';


const BoardContainer = styled.div`
  position: relative;
`

const Block = styled.div`
justify-content: center;
display: flex;
align-items: center;
box-sizing: border-box;
border: 1px solid black;
font-size: .5em;
width: 30px;
height: 30px;
background-color: ${props => props.tileType === 0 ? 'green' : 'blue'};
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
      console.log('new tower added');
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
           const whichTower = `y${whichRow}x${whichTile}`
           return(
             <Block key={uuid()} tileType={tile}>
               <Tile

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

    console.log(Object.keys(this.props.towers).length)




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
