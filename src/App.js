import React, { Component } from 'react';
import Board from './Board'

import ControlPanel from './ControlPanel'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

class App extends Component {
  render() {
    return (
      <MainContainer>
        <Board/>
        <ControlPanel/>
      </MainContainer>


    );
  }
}

export default App;
