import React, {Component} from 'react';
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
  },
  canDrag: function(props, monitor) {
  return props.canDrag;
}
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),

  }
}




class Tower extends Component {
  constructor(props){
    super(props)

    this.state = {
      towerTimer: 0
    }
  }
  render() {
    console.log(this.state.towerTimer)
    const {connectDragSource, isDragging, canDrag} = this.props
        return connectDragSource(
          <div
            style={{

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

  }


export default DragSource(TowerDrag.TOWER, towerSource, collect)(Tower);
