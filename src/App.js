import React, { Component } from 'react';
import {BoardOne, BoardTwo, BoardThree} from './config/board/Boards';
import Board from './Board'

import ControlPanel from './ControlPanel'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      gameState: false,
      movementTimer: 0,
      currentBoard: null
    }
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
    })
  }

  render() {
    return (
      <MainContainer>
        {this.state.currentBoard &&
          <Board gameState={this.state.gameState} movementTimer={this.state.movementTimer}
            currentBoard={this.state.currentBoard}/>
        }

        <ControlPanel startGame={this.startGame} gameState={this.state.gameState}
          changeMap={this.changeMap}
          currentBoard={this.state.currentBoard}/>
      </MainContainer>


    );
  }
}

export default App;
