import React, {Component} from 'react';
import styled from 'styled-components';
import {DragSource, DragLayer} from 'react-dnd'
import {TowerDrag} from './../draggables/Draggable';
import towerOne from './../images/tower-1.png'


const TowerContainer = styled.div`
  border-radius: 20px;
  width: 58px;
  height: 58px;
  background-image: url(${towerOne});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const towerSource = {
  beginDrag(props) {
    props.pickTowerType({towerInfo: {
      type: 'Tower',
      cost: 80,
      range: 1,
      damage: 40,
    }})
    return {};
  },
  canDrag: function(props) {
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

    const {connectDragSource, isDragging} = this.props
        return connectDragSource(
          <div>

            <div
              style={{

                opacity: isDragging ? 0.5 : 1,
                  fontSize: 25,
                  fontWeight: 'bold',
                  cursor: 'pointer',

              }}>

              <TowerContainer>
              
              </TowerContainer>


            </div>
          </div>
        );
  }

  }


export default DragSource(TowerDrag.TOWER, towerSource, collect)(Tower);
