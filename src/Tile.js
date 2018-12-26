import React, { Component } from 'react';
import styled from 'styled-components'
import { DropTarget } from 'react-dnd';
import {TowerDrag} from './draggables/Draggable';
import uuid from 'uuid';

const TileContainer = styled.div`
width: 30px;
height: 30px;
position: relative;
`
const Overlay = styled.div`
border-radius: 40%;
width: 90px;
height: 90px;
pointer-events: none;
background-color: black;
opacity: .2;
position: absolute;
top: -30px;
right: -30px;;

`

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
  // constructor(props){
  //   super(props)
  //
  //
  // }


  // shouldComponentUpdate(nextProps, nextState){
  //
  // }



  render(){
    const {whichTower, towers, coords, connectDropTarget, isOver, tileType} = this.props

    if (tileType !== 0) {
      return (
        <div>
          <TileContainer>
            {
              Object.keys(towers).map(tower => {

                if (tower === whichTower) {
                  return(
                    <div key={uuid()}>
                      {towers[tower].towerElement}
                    </div>
                  )
                }
              })
            }
            {coords}
          </TileContainer>
        </div>
      )
    } else {
      return connectDropTarget(
        <div>
          <TileContainer>
            {isOver && (
              <Overlay>

              </Overlay>
            )}
            {
              Object.keys(towers).map(tower => {

                if (tower === whichTower) {
                  return(
                    <div key={uuid()}>
                      {towers[tower].towerElement}
                    </div>
                  )
                }
              })
            }
            {coords}
          </TileContainer>
        </div>
      );
    }
  }
}

export default DropTarget(TowerDrag.TOWER, tileTarget, collect)(Tile);
