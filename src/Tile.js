import React, { Component } from 'react';
import styled from 'styled-components'
import { DropTarget } from 'react-dnd';
import {TowerDrag} from './draggables/Draggable';
import uuid from 'uuid';
import smoke from './images/smoke.gif'

const TileContainer = styled.div`
width: 30px;
height: 30px;
position: relative;
`

//tower range must be an odd number, this is so it works in tandem with the Tile 'overlay' styled component width/height and position properties//

const Overlay = styled.div`

width: ${props => (props.passOverlayToTile * 30) + 60}px;
height: ${props => (props.passOverlayToTile * 30) + 60}px;
pointer-events: none;
background-color: red;
opacity: .3;
box-sizing: border-box;
position: absolute;
top: ${props => (props.passOverlayToTile * - 15) - 15}px;
right: ${props => (props.passOverlayToTile * - 15) - 15}px;

`

const test = {
  position: 'absolute',
  top: '-15px',
  left: '-15px'
}

const testTwo = {
  position: 'absolute',
top: '-7px',
left: '3px',
}

const tileTarget = {


  drop(props, monitor) {
    props.makeTower(props.coords, props.whichTower)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}




class Tile extends Component {



  render(){
    console.log('rendering');
    const {whichTower, towers, coords, connectDropTarget, isOver, tileType} = this.props
    if (tileType !== 0) {
      return (
        <div>
          <TileContainer
            tileType={tileType}
          >
            {
              Object.keys(towers).map(tower => {

                if (tower === whichTower) {
                  return(
                    <div

                      style={test}
                      key={uuid()}>
                      {towers[tower].towerElement}
                    </div>
                  )
                }
              })
            }
          </TileContainer>
        </div>
      )
    } else {
      return connectDropTarget(
        <div>
          <TileContainer>
            {isOver && (
              <Overlay
                passOverlayToTile={this.props.passOverlayToTile()}>

              </Overlay>
            )}
            {
              Object.keys(towers).map(tower => {



                if (tower === whichTower) {
                  return(
                    //styled div adjusts to center big tower image//
                      <div style={test} key={uuid()}>

                      {towers[tower].towerElement}
                    </div>
                  )
                }
              })
            }

          </TileContainer>
        </div>
      );
    }
  }
}

export default DropTarget(TowerDrag.TOWER, tileTarget, collect)(Tile);
