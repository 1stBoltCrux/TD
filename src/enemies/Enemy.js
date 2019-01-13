import React, { Component } from 'react';
import styled from 'styled-components'

const EnemyContainer = styled.div`
  z-index: 2;
  position: absolute;
  background-color: ${props => props.randomColor};
  width: 30px;
  height: 30px;
  border-radius: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(${props => props.newPosition.right}px, ${props => props.newPosition.top}px);
  transition: transform .2s linear;
`
    const enemyColors = ['red', 'green', 'blue', 'orange', 'teal'];

class Enemy extends Component {
  constructor(props){
    super(props)
    this.state = {
      randomColor: enemyColors[Math.floor(Math.random() * enemyColors.length)]
    }
  }

  render(props) {

    const {enemyPositions, movementTimer, enemyID, enemyHP, enemyStatus, enemyMovementTimer, enemies } = this.props;

    let currentMovementTimer = movementTimer - enemyMovementTimer




    let newPosition = enemyPositions[currentMovementTimer];
    if (newPosition && enemies[enemyID].enemyStatus) {




      return(
        <EnemyContainer
          newPosition={newPosition}
          randomColor={this.state.randomColor}>
          {enemies[enemyID].enemyHP}
        </EnemyContainer>
      )
    } else {
      return(
        null
      )
    }


  }
}

export default Enemy;
