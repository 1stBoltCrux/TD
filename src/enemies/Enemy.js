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
  width: 58px;
  height: 58px;
  border-radius: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(${props => props.newPosition.right -10}px, ${props => props.newPosition.top -20}px);
  transition: transform .2s linear;
`

const EnemyHealthBar = styled.div`
  height: 4px;
  background-color: red;
  width: ${props => props.health + '%'};
  transition: width .5s ease-in-out;
`

const EnemyHealthBarContainer = styled.div`
  z-index: 3;
  position: absolute;
  opacity: .7
  bottom: 53px;
  width: 40px;
  border: 1px solid black;
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

    const {deadEnemies, newPosition, enemyID, enemyStatus, enemies } = this.props;

    let currentEnemyHealth = (enemies[enemyID].enemyHP/enemies[enemyID].initialEnemyHP) * 100;

    if (currentEnemyHealth < 0) {
      currentEnemyHealth = 1;
    }


    if (newPosition && enemies[enemyID].enemyStatus) {

      return(
        <EnemyContainer

          newPosition={newPosition}>
          <EnemyHealthBarContainer>
            <EnemyHealthBar
              health={currentEnemyHealth}/>
          </EnemyHealthBarContainer>
          {/* {enemies[enemyID].enemyHP} */}
        </EnemyContainer>
      )

    } else {
      return null;
    }


  }
}

export default Enemy;
