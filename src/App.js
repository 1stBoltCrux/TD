import React, { Component } from 'react';
import Board from './Board'
import Tower from './towers/Tower'
import ControlPanel from './ControlPanel'
import styled from 'styled-components'
import Enemy from './enemies/Enemy';
import {TILE_H, TILE_W} from './config/movement/MovementVariables';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const EnemyContainer = styled.div`
  height: 600px;
  width: 600px;

  position: relative;
`

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      gameState: false,
      movementTimer: 0,
      currentBoard: null,
      towers: {},
      enemyPositions: [],
      movementTimer: 0,
    }
  }

  setEnemyPositions = () => {
    let top;
    let right;
    let enemyPositions = [];
    this.state.currentBoard.map((row, i) => {

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

  startGame = () => {
    this.setState({
      gameState: !this.state.gameState
    })
    var alterGameState = setInterval(() => {
      if (this.state.gameState === true) {
        this.updateTimer();
      }
      if (this.state.gameState === false) {
        clearInterval(alterGameState)
      }
    }, 750)
  }

  changeMap = (board) => {
    this.setState({
      currentBoard: board
    }, ()=> {
            this.setEnemyPositions();
    })
  }

  makeTower = (tileCoords, whichTower) => {
    let newTower = {};

    newTower[whichTower] = {
      towerElement: <Tower
        towers={this.state.towers}
        movementTimer={this.state.movementTimer} />,
      towerCoords: tileCoords
    }

    let newTowerState = Object.assign(this.state.towers, newTower);

    this.setState({
      towers: newTowerState

    })
  }

  render() {
    console.log('re-rendering app');
    return (

        <MainContainer>


          {this.state.currentBoard &&
            <EnemyContainer>
              <Enemy
                enemyPositions={this.state.enemyPositions}
                movementTimer={this.state.movementTimer}
              />
              <Board
                enemyPositions={this.state.enemyPositions}
                towers={this.state.towers}
                makeTower={this.makeTower}
                gameState={this.state.gameState} movementTimer={this.state.movementTimer}
                currentBoard={this.state.currentBoard}/>
            </EnemyContainer>
          }

          <ControlPanel
            
            startGame={this.startGame} gameState={this.state.gameState}
            changeMap={this.changeMap}
            currentBoard={this.state.currentBoard}/>
        </MainContainer>



    );
  }
}

export default App;
