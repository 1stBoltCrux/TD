import React from 'react';
import styled from 'styled-components';
import {DragSource} from 'react-dnd'
import {TowerDrag} from './../draggables/Draggable'

const TowerContainer = styled.div`
  border-radius: 20px;
  width: 30px;
  height: 30px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const towerSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


function Tower({connectDragSource, isDragging}) {

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        <TowerContainer>
          T
        </TowerContainer>
      </div>

    );
  }


export default DragSource(TowerDrag.TOWER, towerSource, collect)(Tower);
