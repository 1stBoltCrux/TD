import React, { Component } from 'react';
import styled from 'styled-components'
import { DropTarget } from 'react-dnd';
import {TowerDrag} from './draggables/Draggable';
import uuid from 'uuid';


const TileContainer = styled.div`
width: 35px;
height: 35px;
position: relative;
`
//tower range must be an odd number, this is so it works in tandem with the Tile 'overlay' styled component width/height and position properties//

const Overlay = styled.div`
width: ${props => (props.passOverlayToTile * 35) + 70}px;
height: ${props => (props.passOverlayToTile * 35) + 70}px;
pointer-events: none;
background-color: red;
opacity: .3;
box-sizing: border-box;
position: absolute;
top: ${props => (props.passOverlayToTile * - 17.5) - 17.5}px;
right: ${props => (props.passOverlayToTile * - 17.5) - 17.5}px;
`

const test = {
  position: 'absolute',
  top: '-15px',
  left: '-15px'
}

const tileTarget = {
  drop(props) {
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
    const {whichTower, towers, connectDropTarget, isOver, tileType} = this.props
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
