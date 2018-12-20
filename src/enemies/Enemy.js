import React, { Component } from 'react';
import styled from 'styled-components'

const EnemyContainer = styled.div`
  position: absolute;
  background-color: black;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  color: white;
  text-align: center;
  top: ${props => props.newPosition.top}px;
  left: ${props => props.newPosition.right}px;

`


class Enemy extends Component {
  constructor(props){
    super(props)
  }


  render(props) {
    const {enemyPositions, movementTimer} = this.props;
    let newPosition = enemyPositions[movementTimer]
    if (newPosition) {
      console.log(newPosition);
      return(
        <EnemyContainer newPosition={newPosition}>
          ß
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
