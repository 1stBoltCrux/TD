import React, { Component } from 'react';
import styled from 'styled-components'
import {keyframes} from 'styled-components'
import explosion from '../images/explosion.gif'
import goblin from '../images/goblin.png'

const EnemyContainer = styled.div`
  z-index: 2;
  position: absolute;
  background-image: url(${goblin});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(${props => props.newPosition.right -10}px, ${props => props.newPosition.top -20}px);
  transition: transform .2s linear;
`

const fadeOut = keyframes`
from {
opacity: 1
}
to {
 opacity: 0
}
`;

class Enemy extends Component {

  constructor(props){
    super(props)
  }

  render(props) {

    const {deadEnemies, newPosition, enemyID, enemyHP, enemyStatus, enemies } = this.props;




    if (newPosition && enemies[enemyID].enemyStatus) {

      return(
        <EnemyContainer
          newPosition={newPosition}>
          {/* {enemies[enemyID].enemyHP} */}
        </EnemyContainer>
      )

    } else {
      return null;
    }


  }
}

export default Enemy;
