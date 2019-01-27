import React, { Component } from 'react';
import {BoardOne, BoardTwo, BoardThree} from './config/board/Boards';
import Tower from './towers/Tower'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  text-align: center;
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
  margin: 1em auto;
  &:hover {
    cursor: pointer;
  }
`

class ControlPanel extends Component {
  // constructor(props){
  //   super(props)
  // }

  render(props) {

    const {towers, gameState, changeMap, currentBoard} = this.props
    return(
      <ControlsContainer>



        {currentBoard &&
          <div>

            {!gameState && (
              <ControlButton onClick={()=> this.props.startGame(true)}>
                <p>Start!</p>
              </ControlButton>
            )}
            {gameState && (

              <ControlButton onClick={() => this.props.startGame(false)}>
                <p>Stop!</p>
              </ControlButton>

            )}

            <Tower
              canDrag={true}/>
            ${this.props.cash}
          </div>
        }


        {!currentBoard && (

          <div>
            <h3>Select a Map!</h3>
            <ControlButton onClick={() => changeMap(BoardOne)}>
              Map One
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardTwo)}>
              Map Two
            </ControlButton>
            <ControlButton onClick={() => changeMap(BoardThree)}>
              Map Three
            </ControlButton>


          </div>
        )}

      </ControlsContainer>
    )

  }
}

export default ControlPanel;
