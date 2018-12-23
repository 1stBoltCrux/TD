import React, { Component } from 'react';
import Tile from './Tile'
import Enemy from './enemies/Enemy';
import Tower from './towers/Tower'
import styled from 'styled-components'
import uuid from 'uuid'
import {TILE_H, TILE_W, MAP_H, MAP_W} from './config/movement/MovementVariables';


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
        enemyPositions: [],
        movementTimer: 0,
      }
  }


  setEnemyPositions = () => {
    let top;
    let right;
    let enemyPositions = [];
    this.props.currentBoard.map((row, i) => {

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

componentDidMount(){
      this.setEnemyPositions();

  }


  render() {


    const currentMap = this.props.currentBoard.map((row, i) => {

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


    return (
      <div>
        <Tower

          movementTimer={this.props.movementTimer}
          enemyPositions={this.state.enemyPositions}

        />
        <BoardContainer>

          <Enemy movementTimer={this.props.movementTimer} enemyPositions={this.state.enemyPositions}/>

          {currentMap}
        </BoardContainer>
      </div>


    );
  }
}

export default Board;
