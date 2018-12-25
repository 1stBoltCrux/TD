import React, { Component } from 'react';
import styled from 'styled-components'
import { DropTarget } from 'react-dnd';
import {TowerDrag} from './draggables/Draggable';
import uuid from 'uuid';

const TileContainer = styled.div`
  width: 30px;
  height: 30px;
`

const tileTarget = {

  drop(props, monitor) {
    console.log('tileTarget()');
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
const {whichTower, towers, coords, connectDropTarget} = this.props


    return connectDropTarget(
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


    );
        }

}

export default DropTarget(TowerDrag.TOWER, tileTarget, collect)(Tile);
