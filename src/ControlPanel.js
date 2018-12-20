import React, { Component } from 'react';
import styled from 'styled-components'

const ControlsContainer = styled.div`
  height: 638px;
  width: 200px;
`
const ControlButton = styled.div`
  background-color: green;
  width: 100%;
  height: 30px;
  border: 2px solid black;
`


class ControlPanel extends Component {
  constructor(props){
    super(props)
  }

  render(props) {
    return(
      <ControlsContainer>
        <ControlButton onClick={this.props.startGame}>
          Start!
        </ControlButton>
      </ControlsContainer>
    )

  }
}

export default ControlPanel;
