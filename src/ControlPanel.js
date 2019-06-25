import React, { Component } from 'react';
import Boards from './config/board/Boards';
import Tower from './towers/Tower';
import SniperTower from './towers/SniperTower';
import styled from 'styled-components';
import goblin from './images/goblin.png';
import gold from './images/gold.png';

const ControlsContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 200px;
  box-shadow: 5px -1px 25px 2px rgba(0, 0, 0, 0.26);
  margin: 0 14px;

`

const TitleContainer = styled.div`
  font-size: 2em;
  h3 {
    margin-top: 0;
    margin-bottom: .5em;
  }
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
  width: 48%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1%;
`

const CashContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  render() {
    console.log(Boards)
    const {cash, gameState, changeMap, currentBoard, pickTowerType, level} = this.props
    return(
      <ControlsContainer>

        {currentBoard &&
          <div>
     
            <TitleContainer>
              <h3>Goblin Exploder</h3>
            <h3>Level: {level}</h3>
            </TitleContainer>
            <CashContainer>
              <img src={gold} alt="Gold Piece" width="26px"/><h3>&nbsp;- {cash}</h3>
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
                <p>Pause</p>
              </ControlButton>


            )}
            <TowerContainer>
              <TowerStats>
                <Tower
                  pickTowerType={pickTowerType}
                  canDrag={true}
                />
                <strong>Gun Tower</strong>
                cost: 80 <br/>
                range: 1 <br/>
                damage: 40 <br/>
              </TowerStats>
              <TowerStats>
                <SniperTower
                  pickTowerType={pickTowerType}
                  canDrag={true}/>
                <strong>Sniper Tower</strong>
                cost: 120 <br/>
                range: 7 <br/>
                damage: 20 <br/>
              </TowerStats>

            </TowerContainer>
          </div>
        }


        {!currentBoard && (
          <div>
            <div><h3>Welcome to<br/> <strong>Goblin Exploder</strong></h3>

            <img src={goblin} alt="Goblin" width="100%"/>
              <InstructionText>
                <p>The goblins are coming and it's your job to <strong>explode</strong> them! Click and drag towers into strategic positions along the stone path. When you're satisfied with your fortifications, press <strong>start!</strong> - If any goblins make it to the end of the path it's game over pal!</p>
              </InstructionText>
              </div>
            <h3>Select a Map</h3>

            {
              Object.keys(Boards).map((board) => {
                console.log(board.name)
                return (
                  <ControlButton onClick = {() => changeMap(Boards[board].board)}>
                  	{Boards[board].name}
                  </ControlButton>
                )
              })
            }
           
            {/* <ControlButton onClick={() => changeMap(BoardOne)}>
              Map One
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardTwo)}>
              Map Two
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardThree)}>
              Map Three
            </ControlButton> */}


          </div>
        )}

      </ControlsContainer>
    )

  }
}

export default ControlPanel;
