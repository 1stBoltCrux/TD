import React, { Component } from 'react';
import styled from 'styled-components'

const ControlsContainer = styled.div`
  height: 638px;
  border: 1px solid black;
  width: 200px;
`


class ControlPanel extends Component {
  constructor(props){
    super(props)
  }

  render(props) {
    return(
      <ControlsContainer>
        controls
      </ControlsContainer>
    )

  }
}

export default ControlPanel;
