import React, { Component } from 'react';
import styled from 'styled-components'

const EnemyContainer = styled.div`
  z-index: 2;
  position: absolute;
  background-color: black;
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


class Enemy extends Component {
  constructor(props){
    super(props)
    this.state = {
      enemyMovementTimer: Math.floor(Math.random() * 10)
    }
  }


  render(props) {
    console.log(this.state);
    const {enemyPositions, movementTimer, enemyHP, enemyStatus} = this.props;
    let enemyMovementTimer = movementTimer - this.state.enemyMovementTimer
    console.log(enemyMovementTimer);
    let newPosition = enemyPositions[enemyMovementTimer];
    if (newPosition && enemyStatus) {
      console.log(newPosition);



      return(
        <EnemyContainer newPosition={newPosition}>
          {enemyHP}
        </EnemyContainer>
      )
    } else {
      return(
        ''
      )
    }


  }
}

export default Enemy;
