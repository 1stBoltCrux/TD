import React, { Component } from 'react';
import BoardOne from './config/board/BoardOne';
import Tile from './Tile'
import Enemy from './enemies/Enemy'
import styled from 'styled-components'
import uuid from 'uuid'
import {TILE_H, TILE_W, MAP_H, MAP_W} from './config/movement/MovementVariables'

const BoardContainer = styled.div`
  position: relative;
`

const Block = styled.div`
  font-size: .5em;
  border: none;
  width: 30px;
  height: 30px;
  background-color: ${props => props.tileType === 0 ? 'green' : 'blue'};
`;

const Row = styled.div`
  display: flex;
`

class Board extends Component {
  constructor(props){
    super(props)

      this.state = {
        enemyPositions: [],
        movementTimer: 0
      }
  }


  setEnemyPositions = () => {
    let top;
    let right;
    let enemyPositions = []
    BoardOne.map((row, i) => {

      row.map((tile, j) => {
        if(tile !== 0){
          top = i * TILE_H
          right = j * TILE_W
          enemyPositions.push({top:top, right:right, tile: tile})
        }
      })
    })
    enemyPositions.sort((position1, position2) => {
      if( position1.tile < position2.tile ) {
        return -1
      }
    })
    this.setState({
      enemyPositions: enemyPositions
    })
  }

  updateTimer = () => {
    let timer = this.state.movementTimer;
    timer ++
    this.setState({
      movementTimer: timer
    })
  }


componentDidMount(){
    this.setEnemyPositions();
    setInterval(this.updateTimer, 500)
  }


  render() {
    const currentMap = BoardOne.map((row, i) => {

      const whichRow = i;
      return (
          <Row key={uuid()}>
            {row.map((tile, i) => {
              const whichTile = i;
              const coords = [whichRow, whichTile]

              return(
                <Block key={uuid()} tileType={tile}>
                  <Tile
                    key={uuid()}
                    coords={coords}
                    tileType={tile}
                  />
                </Block>
              )
            })}
          </Row>
      )
    })


    return (
      <BoardContainer>
        <Enemy movementTimer={this.state.movementTimer} enemyPositions={this.state.enemyPositions}/>

        {currentMap}
      </BoardContainer>
    );
  }
}

export default Board;
