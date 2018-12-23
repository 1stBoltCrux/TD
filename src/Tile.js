import React, { Component } from 'react';
import styled from 'styled-components'
import { DropTarget } from 'react-dnd';
import {TowerDrag} from './draggables/Draggable';
import uuid from 'uuid'

const TileContainer = styled.div`
  width: 30px;
  height: 30px;
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


function Tile({whichTower, id, towers, coords, tileType, connectDropTarget, isOver}) {

    return connectDropTarget(
      <div>
        <TileContainer>

          {
            Object.keys(towers).map(tower => {
              console.log('hello');
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

export default DropTarget(TowerDrag.TOWER, tileTarget, collect)(Tile);
