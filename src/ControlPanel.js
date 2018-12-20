import React, { Component } from 'react';
import styled from 'styled-components'

const ControlsContainer = styled.div`
  padding: 20px;
  height: 600px;
  width: 200px;
`
const ControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  width: 100%;
  height: 30px;
  border: 2px solid black;

  &:hover {
    cursor: pointer;
  }
`


class ControlPanel extends Component {
  constructor(props){
    super(props)
  }

  render(props) {
    const {gameState} = this.props
    return(
      <ControlsContainer>
        <ControlButton onClick={this.props.startGame}>
          {!gameState && (
            <p>Start!</p>
          )}
          {gameState && (
            <p>Stop!</p>
          )}

        </ControlButton>
      </ControlsContainer>
    )

  }
}

export default ControlPanel;
