import React, { Component } from 'react';
import Board from './Board'
import Tower from './towers/Tower'
import SniperTower from './towers/SniperTower'
import ControlPanel from './ControlPanel'
import styled from 'styled-components'
import Enemy from './enemies/Enemy';
import uuid from 'uuid'
import {TILE_H, TILE_W} from './config/movement/MovementVariables';
import explosion from './images/explosion.gif'
import {keyframes} from 'styled-components'
import ExplosionSound from './audio/ExplosionSound'

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

const fadeOut = keyframes`
from {
opacity: 1
}
to {
 opacity: 0
}
`;

const Explosion = styled.div`
display: flex;
justify-content: center;
align-items: center;
z-index: 3;
position: absolute;
  background-image: url(${explosion});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  left: ${props => props.deadEnemiesLocation.right - 15}px;
  top:  ${props => props.deadEnemiesLocation.top - 15}px;
  animation: ${fadeOut} 1s linear;
  animation-fill-mode: forwards;
  `

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      deadEnemies: {},
      level: 1,
      gameState: false,
      movementTimer: 0,
      currentBoard: null,
      towers: {},
      enemyPositions: [],
      movementTimer: 0,
      enemyStatus: true,
      cash: 400,
      enemies: {},
      randomPosition: [],
      towerTypePicked: null,
      explosionSound: [],
      interval: null,
    }
  }

  passOverlayToTile = () => {
    return this.state.towerTypePicked.towerInfo.range
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

  setEnemyTimer = () => {
    console.log('firing set-enemy-timer');
    let possiblePositions = [];
    let enemies = Array((this.state.level * 2)).fill(0)
  enemies.forEach((enemy, index) => {
      possiblePositions.push(index)
    })
    let randomPosition = [];
    let i = possiblePositions.length;
    let j = 0;


    while (i--) {
      j = Math.floor(Math.random() * (i+1));
      randomPosition.push(possiblePositions[j])
      possiblePositions.splice(j,1)

    }
    this.setState({
      randomPosition: randomPosition
    })
  }

  updateTimer = () => {
    let timer = this.state.movementTimer;
    timer ++
    this.setState({
      movementTimer: timer,
    })
    this.checkForEnemy();
    // lose game and restart //
    if (this.state.movementTimer >= this.state.enemyPositions.length + this.state.randomPosition.length && Object.keys(this.state.enemies).length > 0) {

      this.setState({
        deadEnemies: {},
        level: 1,
        gameState: false,
        movementTimer: 0,
        currentBoard: null,
        towers: {},
        enemyPositions: [],
        movementTimer: 0,
        enemyStatus: true,
        cash: 400,
        enemies: {},
        randomPosition: [],
        explosionSound: [],
        interval: null,
      }, clearInterval(this.state.interval))
      this.setEnemyTimer();
      this.makeEnemies();
    } else if (Object.keys(this.state.deadEnemies).length === this.state.level * 2) {
      setTimeout(()=> {
        this.setState({
          deadEnemies: {},
          level: this.state.level + 1,
          gameState: false,
          movementTimer: 0,
          currentBoard: this.state.currentBoard,
          towers: {},
          enemyPositions: [],
          movementTimer: 0,
          enemyStatus: true,
          cash: this.state.cash + 400,
          enemies: {},
          randomPosition: [],
          explosionSound: [],
        }, clearInterval(this.state.interval))
        this.setEnemyPositions()
        this.setEnemyTimer();
        this.makeEnemies();

      })
    }
  }

  componentDidMount(){
    this.setEnemyTimer();
    this.makeEnemies();
  }

  makeEnemies = () => {
    console.log('firing make-enemies');
    let enemiesObject = {}

    this.state.randomPosition.forEach(enemyTimer => {
      console.log('make-enemies looping through random positions');
      let enemyID = uuid();
      enemiesObject[enemyID] = {
        enemyHP: this.state.level * 10 + 250,
        enemyStatus: true,
        enemyMovementTimer: enemyTimer,
      }
    })
    this.setState({
      enemies: enemiesObject,
    })
    console.log(this.state.enemies);
  }
  startGame = (start) => {


    if (Object.keys(this.state.enemies).length === 0 ) {
      this.makeEnemies()
    }
if (start) {
  this.setState({
    gameState: !this.state.gameState,
    interval: setInterval(() => {
        this.updateTimer();
    }, 400)
  })
} else {
  this.setState({
    gameState: !this.state.gameState
  })
  clearInterval(this.state.interval)
}
  }

  changeMap = (board) => {
    this.setState({
      currentBoard: board
    }, ()=> {
      this.setEnemyPositions();
    })
  }

  pickTowerType = (towerType) => {
    this.setState({
      towerTypePicked: towerType
    })
  }

  makeTower = (tileCoords, whichTower) => {
    const towerInfo = this.state.towerTypePicked.towerInfo

    if (this.state.cash >= towerInfo.cost) {
            let newTower = {};
      switch(towerInfo.type) {

        case 'Tower':

        newTower[whichTower] = {
          towerElement: <Tower
            canDrag={false}
            towers={this.state.towers}
            movementTimer={this.state.movementTimer} />,
            towerCoords: tileCoords,
            towerTarget: [],
            range: 1,
            damage: 40,
          }
          break;

          case 'SniperTower':

          newTower[whichTower] = {
            towerElement: <SniperTower
              canDrag={false}
              towers={this.state.towers}
              movementTimer={this.state.movementTimer} />,
              towerCoords: tileCoords,
              towerTarget: [],
              range: 7,
              damage: 20,
            }
            break;
      }

        let newTowerState = Object.assign(this.state.towers, newTower);

        this.setState({
          towers: newTowerState,
          cash: this.state.cash - towerInfo.cost
        })
      }
    }

    checkForEnemy = () => {

      Object.keys(this.state.towers).map(tower => {
        let towerCoords = tower.split('-')
        let xCoord = parseInt(towerCoords[1])
        let yCoord = parseInt(towerCoords[0])
        let towerRange = this.state.towers[tower].range

        Object.keys(this.state.enemies).map(enemy => {

          const enemyTimer = this.state.movementTimer -this.state.enemies[enemy].enemyMovementTimer
          let currentPosition = this.state.enemyPositions[enemyTimer]

          //tower range must be an odd number, this is so it works in tandem with the Tile 'overlay' styled component width/height and position properties//

          if ( currentPosition &&
            ((currentPosition.top / TILE_H) <= yCoord + ((towerRange + 1) / 2 ) && (currentPosition.top / TILE_H) >= yCoord - ((towerRange + 1) / 2 ))  && ((currentPosition.right / TILE_W) <= xCoord + ((towerRange + 1) / 2 ) && (currentPosition.right / TILE_W) >= xCoord - ((towerRange + 1) / 2 ))
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
                enemyHP: thisEnemy.enemyHP - this.state.towers[tower].damage,
                enemyStatus: thisEnemy.enemyHP > 0 ? true : false,
              })
              newEnemyObject[this.state.towers[tower].towerTarget[0]] = hurtEnemy
              let newEnemyState = Object.assign(this.state.enemies, newEnemyObject)

              this.setState({
                enemies: newEnemyState
              })

              if (!this.state.enemies[enemy].enemyStatus) {
                let deadEnemies = {}
                deadEnemies[enemy] = {
                  location: this.state.enemyPositions[enemyTimer]
                }

                let newDeadEnemies = Object.assign(this.state.deadEnemies, deadEnemies)
                this.setState({
                  deadEnemies: newDeadEnemies,
                  cash: this.state.cash + 15,
                })
                this.explosionSound();
                delete this.state.enemies[enemy]
                console.log('enemy eliminated');

                //this is repetitive, should be turned into a single function as it is repeated in the target changed conditional

                let thisTower = this.state.towers[tower]
                let newTowerObject = {}
                let towerWithTarget = Object.assign(thisTower, {towerTarget: []})
                newTowerObject[tower] = towerWithTarget
                let newTowerState = Object.assign(this.state.towers, newTowerObject)

                this.setState({
                  towers: newTowerState
                })
              }

            }


            //keeps empty target array from causing error on hurtEnemy definition -----end //

          } else if (this.state.towers[tower].towerTarget.includes(enemy) ||  Object.keys(this.state.deadEnemies).includes(this.state.towers[tower].towerTarget[0])){
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

    explodeEnemy = () => {

      if (Object.keys(this.state.deadEnemies).length > 0) {

        return (

          Object.keys(this.state.deadEnemies).map(deadEnemy => {
            return ( <Explosion
              deadEnemiesLocation={this.state.deadEnemies[deadEnemy].location}
                     >

            </Explosion>
            )
          })
        )

      } else {
        return null;
      }
    }

    explosionSound = () => {
        let newExplosionSoundArray = []

          newExplosionSoundArray.push(<ExplosionSound/>)


        this.setState({
          explosionSound: [...this.state.explosionSound, newExplosionSoundArray]
        })

    }

    render() {



      return (

        <MainContainer>
          {this.state.currentBoard &&
            <EnemyContainer>

              {/* convaluted sound setup to get sound library to fire multiple sounds at once */}

              {this.state.explosionSound.map(sound => {
                return sound
              })}


              {Object.keys(this.state.enemies).map(enemy => {
                let newEnemyPosition = this.state.enemyPositions[this.state.movementTimer - this.state.enemies[enemy].enemyMovementTimer]
                return (
                  <Enemy
                    deadEnemies={this.state.deadEnemies}
                    newPosition={newEnemyPosition}
                    enemies={this.state.enemies}
                    key={enemy}
                    enemyID={enemy}
                    enemyStatus={this.state.enemyStatus}
                    enemyHP={this.state.enemyHP}

                  />
                )
              })}

              <Board
                passOverlayToTile={this.passOverlayToTile}
                enemyPositions={this.state.enemyPositions}
                towers={this.state.towers}
                makeTower={this.makeTower}
                gameState={this.state.gameState}
                movementTimer={this.state.movementTimer}
                currentBoard={this.state.currentBoard}/>

              {this.explodeEnemy()}

            </EnemyContainer>
          }

          <ControlPanel
            level={this.state.level}
            pickTowerType={this.pickTowerType}
            cash={this.state.cash}
            startGame={this.startGame} gameState={this.state.gameState}
            changeMap={this.changeMap}
            currentBoard={this.state.currentBoard}/>
        </MainContainer>

          );
        }
      }

      export default App;
