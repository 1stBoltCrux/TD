import React, { Component } from 'react';
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
      movementTimer: 0
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
  render() {
    return (
      <MainContainer>
        <Board gameState={this.state.gameState} movementTimer={this.state.movementTimer}/>
        <ControlPanel startGame={this.startGame} gameState={this.state.gameState}/>
      </MainContainer>


    );
  }
}

export default App;
