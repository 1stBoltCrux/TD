import React, { Component } from 'react';
import {BoardOne, BoardTwo, BoardThree} from './config/board/Boards';
import Tower from './towers/Tower';
import SniperTower from './towers/SniperTower';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  text-align: center;
  padding: 20px;
  height: 600px;
  width: 200px;
`
const ControlButton = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.gameState? '#B7B7B7' : 'green' };  width: 100%;
  height: 30px;
  border: 2px solid black;
  margin: 1em auto;
  &:hover {
    cursor: pointer;
  }
`

const TowerContainer = styled.div`
  display: flex;
`

const TowerStats = styled.div`
  font-size: .8em;
  border: 2px solid #B7B7B7;
  width: 48%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1%;
  padding: .2em;
`

const CashContainer = styled.div`
  color: green;
  font-weight: bold;
`

const KillContainer = styled.div`
  font-weight: bold;
`

const InstructionText = styled.div`
  font-size: .8em;
`

class ControlPanel extends Component {
  // constructor(props){
  //   super(props)
  // }

  shouldComponentUpdate(nextProps){
    if (!this.props.currentBoard || (this.props.gameState !== nextProps.gameState) || (this.props.cash !== nextProps.cash)) {
      return true
    } else {
      return false
    }
  }

  render(props) {
    console.log('control panel rendering');

    const killCountColor = {color: 'red'}

    const {towers, gameState, changeMap, currentBoard, pickTowerType, level} = this.props
    return(
      <ControlsContainer>
        {currentBoard && (
          <div>

            <h2>Level {level}</h2>
          </div>
        )}




        {currentBoard &&
          <div>
            <KillContainer>
              Kills: {this.props.killCount}
            </KillContainer>
            <CashContainer>
              Gold:
              ${this.props.cash}
            </CashContainer>


            {!gameState && (

              <ControlButton
                gameState={gameState}
                onClick={()=> this.props.startGame(true)}
              >
                <p>Start!</p>
              </ControlButton>


            )}
            {gameState && (

              <ControlButton
                gameState={gameState}
                onClick={() => this.props.startGame(false)}
              >
                <p>Stop!</p>
              </ControlButton>


            )}
            <TowerContainer>
              <TowerStats>
                <Tower
                  pickTowerType={pickTowerType}
                  canDrag={true}
                />
                <strong>Gun Tower</strong>
                cost: 80
                range: 1
                damage: 40
              </TowerStats>
              <TowerStats>
                <SniperTower
                  pickTowerType={pickTowerType}
                  canDrag={true}/>
                <strong>Sniper Tower</strong>
                cost: 120
                range: 7
                damage: 20
              </TowerStats>

            </TowerContainer>


          </div>
        }


        {!currentBoard && (

          <div>
            <div>Welcome to <strong>Goblin Exploder!</strong><br/>
              <InstructionText>
                <p>The goblins are coming and it's your job to <strong>explode</strong> them! Click and drag towers into strategic positions along the stone path. When you're satisfied with your fortifications, press start!</p>
              </InstructionText>
              </div>
            <h3>Select a Map!</h3>
            <ControlButton onClick={() => changeMap(BoardOne)}>
              Map One
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardTwo)}>
              Map Two
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardThree)}>
              Map Three
            </ControlButton>


          </div>
        )}

      </ControlsContainer>
    )

  }
}

export default ControlPanel;
