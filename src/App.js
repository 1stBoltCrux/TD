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
      enemyHP: 100,
      enemyStatus: true,
      cash: 100
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
    this.checkForEnemy();
    if (this.state.movementTimer >= this.state.enemyPositions.length && this.state.enemyStatus) {
      this.setState({
        gameState: false,
        movementTimer: 0,
        currentBoard: null,
        towers: {},
        enemyPositions: [],
        movementTimer: 0,
        enemyHP: 100,
        enemyStatus: true,
        cash: 100
      })
    }
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
    if (this.state.cash >= 20) {


    let newTower = {};

    newTower[whichTower] = {
      towerElement: <Tower
        
        canDrag={false}
        towers={this.state.towers}
        movementTimer={this.state.movementTimer} />,
      towerCoords: tileCoords
    }

    let newTowerState = Object.assign(this.state.towers, newTower);

    this.setState({
      towers: newTowerState,
      cash: this.state.cash - 20
    })
  }
  }

checkForEnemy = () => {
  if (this.state.enemyHP <= 0 ) {
    this.setState({
      enemyStatus: false
    })
  }
  Object.keys(this.state.towers).map(tower => {
    let towerCoords = tower.split('-')
    let xCoord = parseInt(towerCoords[1])
    let yCoord = parseInt(towerCoords[0])
    let newPosition = this.state.enemyPositions[this.state.movementTimer];


    if ( newPosition &&
      ((newPosition.top / TILE_H) === yCoord + 1 || (newPosition.top / TILE_H) === yCoord - 1 || (newPosition.top / TILE_H) === yCoord) && (((newPosition.right / TILE_W) === xCoord + 1 || (newPosition.right / TILE_W) === xCoord - 1 || (newPosition.right / TILE_W) === xCoord))
    )  {
      this.setState({
        enemyHP: this.state.enemyHP - 10
      })
      console.log(this.state.enemyHP);
    }


  })



}

  render() {
    return (

        <MainContainer>


          {this.state.currentBoard &&
            <EnemyContainer>
              <Enemy
                enemyStatus={this.state.enemyStatus}
                enemyHP={this.state.enemyHP}
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
            cash={this.state.cash}
            startGame={this.startGame} gameState={this.state.gameState}
            changeMap={this.changeMap}
            currentBoard={this.state.currentBoard}/>
        </MainContainer>



    );
  }
}

export default App;
