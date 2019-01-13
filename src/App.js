import React, { Component } from 'react';
import Board from './Board'
import Tower from './towers/Tower'
import ControlPanel from './ControlPanel'
import styled from 'styled-components'
import Enemy from './enemies/Enemy';
import uuid from 'uuid'
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
      deadEnemies: [],
      level: 1,
      gameState: false,
      movementTimer: 0,
      currentBoard: null,
      towers: {},
      enemyPositions: [],
      movementTimer: 0,
      enemyHP: 250,
      enemyStatus: true,
      cash: 120,
      enemies: {}
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
    if (this.state.movementTimer >= this.state.enemyPositions.length + 10 && Object.keys(this.state.enemies).length > 0) {
      this.setState({
        deadEnemies: [],
        level: 1,
        gameState: false,
        movementTimer: 0,
        currentBoard: null,
        towers: {},
        enemyPositions: [],
        movementTimer: 0,
        enemyHP: 100,
        enemyStatus: true,
        cash: 120,
        enemies: {}
      })
    }
  }

  componentDidMount(){
    this.makeEnemies();
  }

  makeEnemies = () => {
    let enemiesObject = {}
    let enemies = Array((this.state.level * 2)).fill(0)
    enemies.forEach(enemy => {
      let enemyID = uuid();
      enemiesObject[enemyID] = {
        enemyHP: 250,
        enemyStatus: true,
        enemyMovementTimer: Math.floor(Math.random() * 10),
      }
    })
    this.setState({
      enemies: enemiesObject
    })
  }


  startGame = () => {
    if (Object.keys(this.state.enemies).length === 0 ) {
      this.makeEnemies()
    }
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
    }, 400)
  }

  changeMap = (board) => {
    this.setState({
      currentBoard: board
    }, ()=> {
      this.setEnemyPositions();
    })
  }

  makeTower = (tileCoords, whichTower) => {
    if (this.state.cash >= 40) {


      let newTower = {};

      newTower[whichTower] = {
        towerElement: <Tower

          canDrag={false}
          towers={this.state.towers}
          movementTimer={this.state.movementTimer} />,
          towerCoords: tileCoords,
          towerTarget: [],

        }

        let newTowerState = Object.assign(this.state.towers, newTower);

        this.setState({
          towers: newTowerState,
          cash: this.state.cash - 40
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

        Object.keys(this.state.enemies).map(enemy => {

          const enemyTimer = this.state.movementTimer -this.state.enemies[enemy].enemyMovementTimer
          let currentPosition = this.state.enemyPositions[enemyTimer]


          if ( currentPosition &&
            ((currentPosition.top / TILE_H) === yCoord + 1 || (currentPosition.top / TILE_H) === yCoord - 1 || (currentPosition.top / TILE_H) === yCoord) && (((currentPosition.right / TILE_W) === xCoord + 1 || (currentPosition.right / TILE_W) === xCoord - 1 || (currentPosition.right / TILE_W) === xCoord))
          )  {


            if (this.state.towers[tower].towerTarget.length < 1) {
              console.log('target acquired');
              let thisTower = this.state.towers[tower]
              let newTowerObject = {}
              let towerWithTarget = Object.assign(thisTower, {towerTarget: [...this.state.towers[tower].towerTarget, enemy]})

              newTowerObject[tower] = towerWithTarget
              let newTowerState = Object.assign(this.state.towers, newTowerObject)

              this.setState({
                towers: newTowerState
              })

            }
            //keeps empty target array from causing error on hurtEnemy definition//

            if (this.state.enemies[this.state.towers[tower].towerTarget[0]] && (this.state.towers[tower].towerTarget[0] === enemy)) {
              console.log('target hit');
              let thisEnemy = this.state.enemies[this.state.towers[tower].towerTarget[0]]
              let newEnemyObject = {}
              let hurtEnemy = Object.assign(thisEnemy, {
                enemyHP: thisEnemy.enemyHP - 60,
                enemyStatus: thisEnemy.enemyHP > 0 ? true : false,
              })
              newEnemyObject[this.state.towers[tower].towerTarget[0]] = hurtEnemy
              let newEnemyState = Object.assign(this.state.enemies, newEnemyObject)

              this.setState({
                enemies: newEnemyState
              })

              if (!this.state.enemies[enemy].enemyStatus) {
                let deadEnemy = enemy;
                this.setState({
                  deadEnemies: [...this.state.deadEnemies, deadEnemy]
                })
                delete this.state.enemies[enemy]
                console.log(this.state.deadEnemies);
              }

            }


            //keeps empty target array from causing error on hurtEnemy definition -----end //

          } else if (this.state.towers[tower].towerTarget.includes(enemy) ||  this.state.deadEnemies.includes(this.state.towers[tower].towerTarget[0])){
            console.log('target changed');
            let thisTower = this.state.towers[tower]
            let newTowerObject = {}
            let towerWithTarget = Object.assign(thisTower, {towerTarget: []})
            newTowerObject[tower] = towerWithTarget
            let newTowerState = Object.assign(this.state.towers, newTowerObject)

            this.setState({
              towers: newTowerState
            })

          }

        })
      })
    }


    render() {

      return (

        <MainContainer>
          {this.state.currentBoard &&
            <EnemyContainer>
              {Object.keys(this.state.enemies).map(enemy => {

                return (
                  <Enemy
                    enemyMovementTimer={this.state.enemies[enemy].enemyMovementTimer}
                    enemies={this.state.enemies}
                    key={enemy}
                    enemyID={enemy}
                    enemyStatus={this.state.enemyStatus}
                    enemyHP={this.state.enemyHP}
                    enemyPositions={this.state.enemyPositions}
                    movementTimer={this.state.movementTimer}
                  />
                )
              })}

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
